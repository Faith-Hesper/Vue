<template>
  <div id="toolbar">
    <el-card>
      <el-form :model="form" label-position="left" label-width="auto">
        <el-form-item label="数据源">
          <el-select v-model="form.datasourceName">
            <el-option v-for="item in datasources" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="数据集">
          <el-select v-model="form.datasetName">
            <el-option v-for="item in datasets" :label="item" :value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-select v-model="form.date">
            <el-option label="2" value="item"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="datasetsPrint">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
  <div id="main" style="width: 100%; height: 100%"></div>
</template>

<script setup>
import { onMounted, onBeforeMount, nextTick, reactive, ref } from 'vue'
import initMap from '@/utils/echartsMap'
import { getDatasourcesName, getDatasetsName } from '@/utils/analysis'

const datasources = ref([])
const datasets = ref([])
const form = reactive({
  datasourceName: '',
  datasetName: '',
  date: '',
})

const datasetsPrint = ()=>{}
onBeforeMount(async () => {
  // 获取数据源名称集合
  datasources.value = await getDatasourcesName()
  form.datasourceName = datasources.value[0]
  
  // 获取数据集名称集合
  datasets.value = await getDatasetsName(datasources.value)
  form.datasetName = datasets.value[0]
  // console.log(sources)
})

onMounted(async () => {
  nextTick(async() => {
    // selectDate()
    await initMap('main')
  })
})
</script>
<script>
export default {}
</script>

<style scoped>
#toolbar {
  position: absolute;
  top: 100px;
  right: 10px;
  width: 300px;
  text-align: center;
  z-index: 500;
  border-radius: 4px;
}
</style>
