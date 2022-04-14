<template>
  <div :id="mapId" style="position: relative; width:100%; height: 100%"></div>
</template>

<script setup>
import { computed, onMounted, onUpdated, ref, shallowReactive, nextTick } from 'vue'
import mapObject, { mapControl } from '@/utils/map'
import sqlQuery, { buffer_Analysis } from '@/utils/analysis'

// const maps = shallowReactive({
//   map: {}
// })
const props = defineProps({
  mapId: {
    type: String,
    default: 'map'
  },
  sqlResultLayer: {}
})

onMounted(async () => {
  // console.log(props.mapId);
  // map(props.mapId)
  nextTick(async()=>{

    let map = await mapObject(props.mapId)
    await mapControl(map)

  })
  // await mapControl(map)
  // mapControl(map)
})

onUpdated(()=>{
  // L.geoJSON(props.sqlResultLayer).addTo(maps.map)
})
computed(()=>{
  console.log(props.sqlResultLayer);
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
