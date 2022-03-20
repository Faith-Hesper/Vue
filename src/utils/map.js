import L from 'leaflet'
import { tiledMapLayer } from '@supermap/iclient-leaflet'
let map = {}
let markerPoints = {}
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
    // control.onAdd = function () {
    //   let popup = L.DomUtil.create('div')
    //   popup.style.width = '350px'
    //   popup.innerHTML = ''
    //   // handleMapEvent(popup, this._map)
    //   return popup
    // }
    // control.addTo(map)
  })
}

// 添加避难所标记点
async function ponit(points) {
  // 清除前面标记的点
  if (map.hasLayer(markerPoints)) {
    markerPoints.clearLayers()
    control.removeLayer(markerPoints)
  }
  return await new Promise((resolve, reject) => {
    let markers = []
    // 聚焦到标记点
    map.flyTo(points[0].location, 10)
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

export { map, myIcon, ponit }
export default mapInite
