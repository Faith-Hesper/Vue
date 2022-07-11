<template>
  <el-table :data="quakeData" :row-class-name="tableRowClassName" stripe border max-height="670" >
    <el-table-column prop="class" sortable  label="震级(M)"></el-table-column>
    <el-table-column prop="date" label="发震时刻"></el-table-column>
    <el-table-column prop="lat" label="纬度(°)"></el-table-column>
    <el-table-column prop="lng" label="经度(°)"></el-table-column>
    <el-table-column prop="depth" label="深度(千米)"></el-table-column>
    <el-table-column label="位置">
      <template #default="scope">
        <span style="color:blue" class="location_cell" @click="flyToLocation(scope.$index, scope.row)">{{  scope.row.location }}</span>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    background 
    :hide-on-single-page="pageParams.status"
    :page-size="pageParams.pageSize"
    :layout="pageParams.layout"
    :total="pageParams.totalPage"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import { computed, reactive, ref, toRef, watch } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const quakeData = ref([])
const pageParams= reactive({
  status: true,
  pageSize: 10,
  layout: "prev, pager, next, jumper",
  totalPage: 1
})
const props = defineProps({
  quakeInformation: {
    type: Array,
    default: []
  },
})
// const map11 = ref({})
const refData = toRef(props,'quakeInformation') 

const tableRowClassName=({row,rowIndex})=>{
  // console.log(row,rowIndex);
  if (rowIndex%2 === 0) {
    if(row.class>=6) {
    return 'evenlg-row'
  }
    return 'even-row'
  } 
  if(row.class>=6) {
    return 'lg-row'
  }
  return ''
}

const mouseHover = (event)=>{
  console.log(event);
}

// 表格数据分页
const handleCurrentChange = (currentPage)=>{
  // console.log(currentPage);
  quakeData.value = refData.value !==[]?refData.value.slice((currentPage-1)*10,currentPage*10):[]
  
}

const flyToLocation = (index,row)=>{
  let map = store.state.map
  map.flyTo(L.latLng(row.lat,row.lng),8)
  // document.getElementById('quakeMap').scrollTop = 560
  // console.log(index,row);
}

const sort = (a,b)=>{
  console.log(a,b);
  return a-b
}

// map11.value = computed(()=> {
//   console.log(store.state.map);
//   return store.state.map
// })


// 监听从父组件传入的数据是否发生变化并渲染表格
watch(refData,(now,old)=>{
  pageParams.status = false
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

<style lang="less">
.box-card {
  width: 1000px;
}
.el-table .even-row {
  background-color: #eeeeee;
}
.el-table .evenlg-row {
  background-color: #eeeeee;
  color: red;
}
.el-table .lg-row {
  color: red;
}
.quaketable {
  border: 5px solid #ebeef5;
  border-radius: 4px;
  background-color: #ffffff;
}
.el-pagination {
  justify-content: center
}
.location_cell:hover {
  background-color: red;
}
</style>
