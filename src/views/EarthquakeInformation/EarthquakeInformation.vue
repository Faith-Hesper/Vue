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
            <MapContainer mapId="quakeMap" style="max-width:1000px; height:500px"></MapContainer>
          </el-main>
        </el-container>
      </el-card>
      <template v-if="footerStatus">
        <el-card shadow="hover" style="margin: 10px 0">
          <!-- <el-footer> -->
          <FooterContainer :quakeInformation="formData"></FooterContainer>
          <!-- </el-footer> -->
        </el-card>
      </template>
    </el-col>
  </el-row>
</template>

<script setup>
import BreadCrumb from '@/components/Common/BreadCrumb'
import QuakeDataSearch from '@/components/AsideContainer/QuakeDataSearch'
import MapContainer from '@/components/MapContainer/MapContainer'
import FooterContainer from '@/components/FooterContainer/FooterContainer.vue'
import { ref } from 'vue'
const asideShow = ref()
const footerStatus = ref(false)
const formData = ref({})
const rAside = ref(false)

// 地震信息查询窗口状态
const aside = (status) => {
  asideShow.value = status
}

// 地震信息列表状态
const footerStatusChange = (status) => {
  footerStatus.value = status
}

const search = (data) => {
  formData.value = data
  console.log(formData)
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
