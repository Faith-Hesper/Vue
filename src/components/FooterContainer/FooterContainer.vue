<template>
  <!-- <el-row> -->
    <!-- <el-col :span="20" :offset="2"> -->
      <!-- <el-card class="box-card"> -->
      <!-- <div class="quaketable"> -->
        <el-table :data="quakeData" stripe border  max-height="550">
          <el-table-column prop="class" label="震级"></el-table-column>
          <el-table-column prop="date" label="发震时刻"></el-table-column>
          <el-table-column prop="lat" label="纬度"></el-table-column>
          <el-table-column prop="lng" label="经度"></el-table-column>
          <el-table-column prop="depth" label="深度"></el-table-column>
          <el-table-column prop="location" label="位置"></el-table-column>
        </el-table>
      <!-- </div> -->
      <!-- </el-card> -->
    <!-- </el-col> -->
  <!-- </el-row> -->
</template>

<script setup>
import sqlQuery from '@/utils/analysis'
import { onMounted, onUpdated, reactive,ref } from 'vue'
const quakeData = ref([])
const props = defineProps({
  quakeInformation: []
})

onUpdated( ()=>{
  quakeData.value = props.quakeInformation
  console.log(props.quakeInformation);
  console.log(quakeData.value);
  // const {features:{features:sqlResult}} = await sqlQuery('',props.quakeInformation.date[0])
  // // sqlResult.map(item=>{
  // //   item.properties
  // // })
  // console.log(props.quakeInformation.date[0]);
  // console.log(sqlResult);
  // quakeData = quakeInformation
})
</script>
<script>
export default {}
</script>

<style scoped>
.box-card {
  width: 1000px;
}
.quaketable {
  border: 5px solid #ebeef5;
  border-radius: 4px;
  background-color: #ffffff;
}
</style>
