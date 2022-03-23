<template>
  <el-container class="layout-container" style="height: 44.4375rem">
    <el-header>
    <HeaderContainer></HeaderContainer>
    </el-header>
    <el-container>
      <!-- <el-space :fill="fill" wrap>  -->
        <AsideContainer></AsideContainer>
      <!-- </el-space> -->
      <el-main>
      <MapContainer></MapContainer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { onMounted,provide,shallowRef } from 'vue'
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer.vue'
import AsideContainer from '@/components/AsideContainer/AsideContainer.vue'
import MapContainer from '@/components/MapContainer/MapContainer.vue'
import { earthPoint,recentData } from '@/utils/map'
import { earthquake } from '@/api/base'

export default {
  name: 'Home',
  components: {
    HeaderContainer,
    AsideContainer,
    MapContainer
  },
  setup(props) {

    // let earthquakeData = shallowReactive({
    //   earthquakePoint: [],
    //   recentData: {}
    // })
    let earthquakePoint = shallowRef([])
    let recentquakeData = shallowRef({})
    // provide('earthquakeData',earthquakeData)
    provide('earthquakePoint',earthquakePoint)
    provide('recentquakeData',recentquakeData)
    onMounted(async ()=>{
      // 请求地震点数据
      const { data:{ result } } = await earthquake()
      let reverseDate = result.reverse()
      earthquakePoint.value = await earthPoint(reverseDate)
      recentquakeData.value =await recentData(reverseDate)
    })
    return {
      earthquakePoint,
      recentquakeData
    }
  }
}
</script>

<style scoped>
.el-header {
  height: 50px;
  position: relative;
  padding: 0;
  background-color: #b3c0d1;
  display: flex;
  justify-content: left;
  align-items: center;
  text-align: center;
}
.el-main {
  padding: 0;
  border-right: none;
}


</style>
