import L from 'leaflet'
import { tiledMapLayer } from '@supermap/iclient-leaflet'
import '@/utils/L.Icon.Pulse'
import { recentDate } from '@/utils/date'
import echarts from 'echarts'

let map = {},
  markerPoints = {},
  earthquakePoint = {},
  control,
  echartControls,
  baseMap = {}
const url = 'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China'

const myIcon = L.icon({
  iconUrl: 'https://iclient.supermap.io/web/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 35],
})

// 初始化地图
async function mapInite() {
  return await new Promise((resolve, reject) => {
    let baseMapLayer = tiledMapLayer(url)
    map = L.map('map', {
      // crs: L.CRS.EPSG4326,
      center: [39, 118],
      minZoom: 2,
      maxZoom: 18,
      zoom: 8,
      layers: baseMapLayer,
    })
    // console.log(map);
    baseMap = {
      '中国底图': baseMapLayer,
    }
    control = L.control.layers(baseMap).addTo(map)
    L.control
      .scale({
        imperial: false,
        maxWidth: 200,
      })
      .addTo(map)

    resolve(map)
  })
}

// 添加避难所标记点
async function ponit(points) {
  // 清除前面标记的点、图层
  if (map.hasLayer(markerPoints)) {
    markerPoints.clearLayers()
    control.removeLayer(markerPoints)
  }
  return await new Promise((resolve, reject) => {
    let markers = []
    // 聚焦到标记点 放大13
    map.flyTo(points[0].location, 13)
    points.forEach((item) => {
      let marker = L.marker(item.location, { icon: myIcon }).bindPopup(
        `<p>城市: ${item.cityname}</p><p>地区: ${item.adname}</p><p>类型: ${item.name}</p>`
      )
      markers.push(marker)
    })
    markerPoints = L.featureGroup(markers)
    markerPoints
      .on('mousemove', (e) => e.layer.openPopup())
      .on('mouseout', (e) =>
        // 为marker绑定鼠标移入、移除事件
        e.layer.closePopup()
      )
      .addTo(map)
    // 添加图层
    control.addOverlay(markerPoints, '避难所')

    resolve(markers)
  })
}

// 地震点
async function earthPoint(result) {
  if (map.hasLayer(earthquakePoint)) {
    earthquakePoint.clearLayers()
    control.removeLayer(earthquakePoint)
  }
  return await new Promise((resolve, reject) => {
    // 导入的L.icon.pulse
    const pulseIcon = L.icon.pulse({
      iconSize: [12, 12],
      color: '#F60',
      fillColor: '#FAA90E', // 填充色
    })
    let markers = []
    // console.log(result)
    result.map((item, index) => {
      if (index == 0) {
        map.flyTo(L.latLng([item.EPI_LAT, item.EPI_LON]), 11)
      }
      markers.push(
        L.marker([item.EPI_LAT, item.EPI_LON], {
          icon: pulseIcon,
        }).bindPopup(
          `<p>城市: ${item.LOCATION_C}</p><p>震级: ${item.M}</p><p>深度: ${item.EPI_DEPTH} 千米</p><p>发震时刻: ${item.O_TIME}</p>`
          )
          )
        })
    earthquakePoint = L.featureGroup(markers)
      .on('mousemove', (e) => e.layer.openPopup())
      .on('click', (e) => e.layer.openPopup())
      .on('mouseout', (e) => e.layer.closePopup())
      .addTo(map)
    control.addOverlay(earthquakePoint, '地震源')
    resolve(markers)
  })
}

// echarts 图表
async function Chart(echartsData) {
  return await new Promise((resolve, reject) => {
    let div = L.DomUtil.create('div')
    new L.Draggable(div).enable()
    let option = {
      title: {
        text: '地震曲线图',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['地震数量'],
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: echartsData.time,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '地震数量',
          type: 'line',
          stack: 'Total',
          data: echartsData.count,
        },
      ],
    }
    const chart = echarts.init(div, '', {
      width: 500,
      height: 300,
    })
    chart.setOption(option)
    echartControls = L.control({ position: 'topleft' })
    echartControls.onAdd = function (map) {
      return chart.getDom()
    }
    echartControls.addTo(map)
    // console.log(chart);
    resolve(chart)
  })
}

// 最近几天地震数据
async function recentData(reverseDate) {
  let recent_echartsData = await new Promise((resolve) => {
    let sevenAgoTime = recentDate(7)
    let recent_echartsData = {
      data: [],
      time: [],
      count: [],
    }
    sevenAgoTime.map((item) => {
      let time = item
      let data = []
      let earthquakeCount = 0
      reverseDate.map((item, index) => {
        let earthquakeTime = item.CATA_ID.slice(6, 10)
        if (time == earthquakeTime) {
          data.push(item)
          earthquakeCount++
        }
      })
      recent_echartsData.data.push(data)
      recent_echartsData.time.push(item)
      recent_echartsData.count.push(earthquakeCount)
    })
    // console.log(recent_echartsData)
    resolve(recent_echartsData)
  })
  // 渲染echarts图表
  // console.log(recent_echartsData);
  await Chart(recent_echartsData)
  return recent_echartsData
}

async function recentPonit(recentquakeData) {
  let allData = await new Promise((resolve, inject) => {
    let allData = []
    recentquakeData.value.data.map(dayPonints => {
      dayPonints.map(item => {
        allData.push(item)
      })
    }) 
    resolve(allData)
    // console.log(allData)
  })
  echartControls.remove()
  return await earthPoint(allData)
}


export { map, myIcon, ponit, earthPoint, Chart, recentData, recentPonit }
export default mapInite
