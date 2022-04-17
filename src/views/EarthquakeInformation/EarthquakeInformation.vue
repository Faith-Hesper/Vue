<template>
  <el-row>
    <el-col :span="20" :offset="2">
      <el-card shadow="hover" :body-style="{ padding: '0px 20px' }">
        <el-container>
          <el-header height="30px">
            <BreadCrumb></BreadCrumb>
          </el-header>
          <el-main>
            <QuakeDataSearch @footer="footerStatusChange" @search="search"></QuakeDataSearch>
            <MapContainer mapId="quakeMap" :sqlResultLayer="sqlResultFeatures" style="max-width:1000px; height:500px"></MapContainer>
          </el-main>
        </el-container>
      </el-card>
      <template v-if="footerStatus">
        <el-card shadow="hover" style="margin: 10px 0">
          <FooterContainer :quakeInformation="sqlQueryResult"></FooterContainer>
        </el-card>
      </template>
    </el-col>
  </el-row>
</template>

<script setup>
import { onBeforeMount, reactive, ref } from 'vue'
import BreadCrumb from '@/components/Common/BreadCrumb'
import QuakeDataSearch from '@/components/Common/QuakeDataSearch'
import MapContainer from '@/components/MapContainer/MapContainer'
import FooterContainer from '@/components/FooterContainer/FooterContainer.vue'
import sqlQuery from '@/utils/analysis'

const asideShow = ref()
const footerStatus = ref(true)
const sqlQueryResult = ref([])
const sqlResultFeatures = ref({})

// 地震信息查询窗口状态
const aside = (status) => {
  asideShow.value = status
}

// 地震信息列表状态
const footerStatusChange = (status) => {
  footerStatus.value = status
}

// 获取SQL查询到的数据并传给子组件
const search = async(sqlFilter) => {
  const { features } = await sqlQuery('', sqlFilter)
  console.log(features);
  sqlResultFeatures.value = features
  console.log(sqlResultFeatures.value)
  const { features: sqlResult } = features
  let sqlData = sqlResult.map((item) => {
    let temp = {
      class: item.properties.CLASS,
      date: item.properties.QUAKEDATE,
      lat: item.properties.LAT,
      lng: item.properties.LNG,
      depth: item.properties.DEPTH,
      location: item.properties.LOCATION,
    }
    return temp
  })
  sqlQueryResult.value = sqlData
  console.log(sqlQueryResult)
}
</script>

<script>
export default {}
</script>

<style>
.breadcrumb {
  padding: 20px 0;
  margin: 0 auto;
}
</style>
