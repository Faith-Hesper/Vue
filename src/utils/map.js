import L from 'leaflet'
import { tiledMapLayer } from '@supermap/iclient-leaflet'
import '@/utils/L.Icon.Pulse'
import echarts from 'echarts'

let map = {}
let markerPoints = {},earthquakePoint = {}
let control,
  baseMap = {}
const url = 'https://iserver.supermap.io/iserver/services/map-china400/rest/maps/China'

const myIcon = L.icon({
  iconUrl: 'https://iclient.supermap.io/web/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 35],
})

// 初始化地图
async function mapInite() {
  await new Promise((resolve, reject) => {
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
      China: baseMapLayer,
    }
    // control =
    // ({ position: 'topright' })
    control = L.control.layers(baseMap).addTo(map)
    L.control.scale({
      imperial: false,
      maxWidth: 200
    }).addTo(map)
    // control.onAdd = function () {
    //   let popup = L.DomUtil.create('div')
    //   popup.style.width = '350px'
    //   popup.innerHTML = ''
    //   // handleMapEvent(popup, this._map)
    //   return popup
    // }
    // control.addTo(map)
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
    markerPoints.on('mousemove', e => e.layer.openPopup())
    .on('mouseout', e => 
      // 为marker绑定鼠标移入、移除事件
      e.layer.closePopup()
    )
      .addTo(map)
    // 添加图层
    control.addOverlay(markerPoints,"marker")

    resolve(markerPoints)
  })
}

async function earthPoint(result) {
  if (map.hasLayer(earthquakePoint)) {
    earthquakePoint.clearLayers()
    control.removeLayer(earthquakePoint)
  }
  new Promise((resolve, reject) => {
    // 导入的L.icon.pulse
    const pulseIcon = L.icon.pulse({
      iconSize: [12, 12],
      color: '#F60',
      fillColor: '#FAA90E' // 填充色
    })
    let markers = []
    result.map(item => {
      markers.push(L.marker([item.EPI_LAT, item.EPI_LON], {
        icon: pulseIcon
      }).bindPopup(
        `<p>城市: ${item.LOCATION_C}</p><p>震级: ${item.M}</p><p>深度: ${item.EPI_DEPTH} 千米</p><p>发震时刻: ${item.O_TIME}</p>`
      ))
    })
    earthquakePoint = L.featureGroup(markers)
    .on('mousemove', e => e.layer.openPopup())
    .on('click', e => e.layer.openPopup())
    .on('mouseout', e => e.layer.closePopup())
      .addTo(map)
      control.addOverlay(earthquakePoint,"earthquakePoint")
  })
}
  
async function Chart(echartsData) {
  console.log(echartsData.count);
  await new Promise((resolve, reject) => {
    let div = L.DomUtil.create('div')
    let option = {
      title: {
        text: '地震曲线图'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ["地震数量"]
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: echartsData.time
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: "地震数量",
        type: "line",
        stack: "Total",
        data: echartsData.count
      }
      ]
    }
    const chart = echarts.init(div, '', {
      width: 500,
      height: 300
    })
    chart.setOption(option);
    var controls = L.control({position: 'topleft'});
    controls.onAdd = function (map) {
        return chart.getDom();
    }
    controls.addTo(map)
    console.log(chart);
    // resolve(chart)
  })
  }

export { map, myIcon, ponit,earthPoint,Chart }
export default mapInite
