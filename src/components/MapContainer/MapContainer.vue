<template>
  <!-- <a name="btn">11</a> -->
  <!-- <div style="position: relative">111</div> -->
  <!-- <el-card></el-card> -->
  <div :id="mapId" style="position:relative; width:100%; height: 100%"></div>
  <!-- <div style="position:relative; top:-200px; left:100px; width:50px; z-index:500;">111</div> -->
</template>

<script setup>
import { onMounted, ref, shallowReactive, nextTick, toRef, watch } from 'vue'
import { useStore } from 'vuex'
import mapObject, { mapControl, pulsingIcon } from '@/utils/map'
import sqlQuery, { buffer_Analysis } from '@/utils/analysis'
const store = useStore()
const maps = shallowReactive({
  map: {},
  control: {},
})
const props = defineProps({
  mapId: {
    type: String,
    default: 'map'
  },
  sqlResultLayer: {
    type: Object,
    default: {}
  }
})

let sqlLayer= {}

const refResultLayer = toRef(props,"sqlResultLayer")

watch(refResultLayer,(newSqlResultLayer,oldSqlResultLayer)=>{
  try {
    maps.map.removeLayer(sqlLayer)
    maps.control.removeLayer(sqlLayer)
  } catch (error) {
    
  }

  maps.map.flyTo(L.latLng(newSqlResultLayer.features[0].properties.LAT,newSqlResultLayer.features[0].properties.LNG),8)
  sqlLayer = L.geoJSON(newSqlResultLayer,{
    pointToLayer: (geoJsonPoint, latlng)=>{
      if(geoJsonPoint.properties.CLASS>=6){
        return L.marker(latlng,{
          icon: pulsingIcon(geoJsonPoint.properties.CLASS*2.5,'#F60','#ff0000')
        }).bindPopup(`<p>震源: ${geoJsonPoint.properties.LOCATION}</p><p>震级: ${geoJsonPoint.properties.CLASS}</p><p>深度: ${geoJsonPoint.properties.DEPTH} 千米</p><p>发震时刻: ${geoJsonPoint.properties.QUAKEDATE}</p`)
      }
      return L.marker(latlng,{
          icon: pulsingIcon(geoJsonPoint.properties.CLASS*2.5,"#F60","#efcc00",false)
        }).bindPopup(`<p>震源: ${geoJsonPoint.properties.LOCATION}</p><p>震级: ${geoJsonPoint.properties.CLASS}</p><p>深度: ${geoJsonPoint.properties.DEPTH} 千米</p><p>发震时刻: ${geoJsonPoint.properties.QUAKEDATE}</p`)
    }
  })
  sqlLayer.on('mousemove', (e) => e.layer.openPopup())
      .on('mouseout', (e) =>e.layer.closePopup())
      .on('click', (e) =>
        maps.map.flyTo(e.latlng,8))
      .addTo(maps.map)
    
  maps.control.addOverlay(sqlLayer,"地震点")
  store.commit("mapChange",maps.map)
})

onMounted(async () => {
  nextTick(async()=>{
    maps.map = await mapObject(props.mapId)
    maps.control = await mapControl(maps.map)
  })
})

</script>

<script>
// import getCoordsPoint from '../../utils/getCoordsPoint'
/*
1应急知识：
地震逃生小常识

2地理场景与数据：
三维地形，二维地图，人口，建筑，交通，学校，应急避难场所，救援队伍，政府驻地

3模拟演练：
疏散路径
救灾路径

4灾害模拟与统计上报：
地震影响范围，不同震级 烈度
房屋抗震烈度，损毁情况统计
灾情统计上报

5安全问题：
堰塞湖，易燃易爆 易泄露化工厂，地铁，矿山塌陷
天气引起二次灾害可能性

*/
export default {
  name: 'Map',
  // props: {
  //   mapId: 'map'
  // },
  // setup() {

  // const getGeoData = () => {
  //   let k = 0
  //   for (let i = 0; i <= 5; i++) {}
  // }
  // const data = onMounted(async () => {
  //   await mapInite()

  // const sqlResult = await sqlQuery()
  // let resultLayer = L.geoJSON(sqlResult.features, {
  //   onEachFeature: (feature, layer) => {
  //     // console.log(feature, layer)
  //     layer.bindPopup(feature.properties.LOCATION)
  //   },
  // }).addTo(map)

  // 缓冲区分析
  // const bufferResult = await buffer_Analysis()
  // L.geoJSON(bufferResult.recordset.features).addTo(map)
  // })

  // 烈度
  // const intensity = () => {}

  // return {
  //   data,
  // getGeoData,
  // }
  // },
}
</script>

<style scoped>
.el-main {
  padding: 0;
  border-right: none;
}
</style>
