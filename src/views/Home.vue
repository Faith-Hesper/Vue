<template>
  <el-container class="layout-container">
    <AsideContainer ></AsideContainer>
    <el-container>
      <el-header>
        <HeaderContainer>
          <template v-slot:expand_btn>
            <ExpandBtn></ExpandBtn>
          </template>
        </HeaderContainer>
      </el-header>
      <el-main>
        <router-view></router-view>
        <!-- <MapContainer></MapContainer> -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { onMounted, provide, ref, shallowRef, reactive } from 'vue'
import HeaderContainer from '@/components/HeaderContainer/HeaderContainer.vue'
import AsideContainer from '@/components/AsideContainer/AsideContainer.vue'
// import MapContainer from '@/components/MapContainer/MapContainer.vue'
import ExpandBtn from '@/components/HeaderContainer/ExpandBtn.vue'
import { earthPoint, recentData } from '@/utils/map'
import { earthquake } from '@/api/base'


export default {
  name: 'Home',
  components: {
    HeaderContainer,
    AsideContainer,
    // MapContainer,
    ExpandBtn,
  },

  setup(props) {
    const earthquakePoint = shallowRef([])
    const recentquakeData = shallowRef({})

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

    return {
      earthquakePoint,
      recentquakeData
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
