<template>
  <el-container class="layout-container">
    <el-header>
      <HeaderContainer>
        <template v-slot:expand_btn>
          <ExpandBtn @btnClicked="Collapse"></ExpandBtn>
        </template>
      </HeaderContainer>
    </el-header>
    <el-container>
      <!-- <el-space :fill="fill" wrap>  -->
      <AsideContainer :isCollapse="collapseText" @rightAside="aside"></AsideContainer>
      <!-- </el-space> -->
      <template v-if="asideShow">
        <el-aside width="400px" height="400px">
          <QuakeDataSearch @footer="footerStatusChange" @search="search"></QuakeDataSearch>
        </el-aside>
      </template>
      <el-container>
        <el-main>
          <MapContainer></MapContainer>
        </el-main>
      </el-container>
    </el-container>
            <template v-if="footerStatus">
          <el-footer>
            <FooterContainer :quakeInformation="formData"></FooterContainer>
          </el-footer>
        </template>
  </el-container>
</template>

<script>
import { onMounted, provide, ref, shallowRef, reactive } from 'vue'
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer.vue'
import AsideContainer from '@/components/AsideContainer/AsideContainer.vue'
import MapContainer from '@/components/MapContainer/MapContainer.vue'
import QuakeDataSearch from '@/components/AsideContainer/QuakeDataSearch.vue'
import FooterContainer from '@/components/FooterContainer/FooterContainer.vue'
import ExpandBtn from '@/components/HeaderContainer/ExpandBtn.vue'
import { earthPoint, recentData } from '@/utils/map'
import { earthquake } from '@/api/base'

export default {
  name: 'Home',
  components: {
    HeaderContainer,
    AsideContainer,
    MapContainer,
    QuakeDataSearch,
    FooterContainer,
    ExpandBtn,
  },

  setup(props) {
    const earthquakePoint = shallowRef([])
    const recentquakeData = shallowRef({})
    const collapseText = ref()
    const asideShow = ref()
    const footerStatus = ref(false)
    const formData = ref({})

    // provide('earthquakeData',earthquakeData)
    provide('earthquakePoint', earthquakePoint)
    provide('recentquakeData', recentquakeData)
    onMounted(async () => {
      // 请求地震点数据
      const {
        data: { result },
      } = await earthquake()
      let reverseDate = result.reverse()
      earthquakePoint.value = await earthPoint(reverseDate)
      recentquakeData.value = await recentData(reverseDate)
    })

    // 侧边栏折叠状态
    const Collapse = (iscollapse) => {
      collapseText.value = iscollapse
      // console.log(iscollapse);
    }

    // 地震信息查询窗口状态
    const aside = (status) => {
      asideShow.value = status
    }

    // 地震信息列表状态
    const footerStatusChange = (status) => {
      footerStatus.value = status
    }

    const search = (data)=>{
      formData.value = data
      console.log(formData);
    }
    return {
      earthquakePoint,
      recentquakeData,
      Collapse,
      collapseText,
      aside,
      asideShow,
      footerStatusChange,
      footerStatus,
      search,
      formData
    }
  },
}
</script>

<style scoped>
.layout-container {
  height: 44.4375rem;
}
.el-header {
  height: 2.7rem;
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
