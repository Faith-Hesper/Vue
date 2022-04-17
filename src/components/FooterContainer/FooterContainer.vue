<template>
  <el-table :data="quakeData" stripe border max-height="660">
    <el-table-column prop="class" label="震级"></el-table-column>
    <el-table-column prop="date" label="发震时刻"></el-table-column>
    <el-table-column prop="lat" label="纬度"></el-table-column>
    <el-table-column prop="lng" label="经度"></el-table-column>
    <el-table-column prop="depth" label="深度"></el-table-column>
    <el-table-column prop="location" label="位置"></el-table-column>
  </el-table>
  <el-pagination
    :page-size="10"
    layout="prev, pager, next"
    :total="pageParams.totalPage"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { isRef, onBeforeMount, onMounted, reactive, ref, toRef, watch } from 'vue'
const quakeData = ref([])
const pageParams= reactive({
  totalPage: 50
})
const props = defineProps({
  quakeInformation: {
    type: Array,
    default: []
  },
})

const refData = toRef(props,'quakeInformation') 

// 表格数据分页
const handleCurrentChange = (currentPage)=>{
  // console.log(currentPage);
  quakeData.value = refData.value.slice((currentPage-1)*10,currentPage*10)
}

onBeforeMount(()=>{
  console.log(isRef(props.quakeInformation));
  // pageParams.totalPage = 50
})
onMounted(()=>{
  // console.log('object');
})

// 监听从父组件传入的数据是否发生变化并渲染表格
watch(refData,(now,old)=>{
  pageParams.totalPage = now.length
  quakeData.value = now.slice(0,10)
  console.log(quakeData.value);
},{
  deep: true,
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
.el-pagination {
  justify-content: center
}
</style>
