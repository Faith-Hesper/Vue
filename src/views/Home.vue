<template>
  <el-container class="layout-container" style="height: 700px">
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
import HeaderContainer from '../components/HeaderContainer/HeaderContainer.vue'
import AsideContainer from '../components/AsideContainer/AsideContainer.vue'
import MapContainer from '../components/MapContainer/MapContainer.vue'
export default {
  name: 'Home',
  props: {
    msg: String,
  },
  components: {
    HeaderContainer,
    AsideContainer,
    MapContainer
  },
  setup(props) {}
}
</script>

<style scoped>
.el-header {
  height: 50px;
  position: relative;
  padding: 0;
  background-color: #b3c0d1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.el-main {
  padding: 0;
  border-right: none;
}


</style>
