<template>
  <div id="toolbar" class="panel panel-primary">
    <div class="panel-heading">
      <h5 class="panel-title text-center">数据</h5>
    </div>
    <div class="panel-body content">
      <div class="panel">
        <div class="input-group">
          <span class="input-group-addon">数据源</span>
          <select id="datasourcesSelect" class="form-control"></select>
        </div>
      </div>
      <div class="panel">
        <div class="input-group">
          <span class="input-group-addon">数据集</span>
          <select id="datasetsSelect" class="form-control"></select>
        </div>
      </div>
      <div class="panel">
        <div class="input-group">
          <span class="input-group-addon">日期</span>
          <select id="dateSelect" class="form-control"></select>
        </div>
      </div>
      <input
        type="button"
        class="btn btn-default"
        value="查询"
        @click="datasetsPrint()"
      />
    </div>
  </div>
  <div id="main" style="width: 100%; height: 700px"></div>
</template>

<script>
import { onMounted, nextTick } from 'vue'
import maps from '@/utils/echartsMap'
import { selectDate } from '@/utils/analysis'
export default {
  setup() {
    onMounted(() => {
      nextTick(() => {
        // selectDate()
        maps('main')
      })
    })
  },
}
</script>

<style scoped>
#toolbar {
  position: absolute;
  top: 50px;
  right: 10px;
  width: 300px;
  text-align: center;
  z-index: 500;
  border-radius: 4px;
}
</style>
