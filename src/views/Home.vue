<template>
  <el-row>
    <el-col :span="4" style="margin-left: 10px;">
      <el-card class="info-card" :body-style="{ padding: '0px 0px' }">
        <div class="info">
          <span>地震信息</span>
          <a style="float:right;">更多</a>
        </div>
        <ul>
          <li v-for="item in quakeInfo" :key="item.id">{{ item.quakedate }} {{ item.location }}</li>
        </ul>
      </el-card>
    </el-col>
    <el-col :span="6">
      <el-card :body-style="{ padding: '0px 0px' }">
        <div id="echart" style="height: 300px">111</div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import { onBeforeMount, provide, ref, shallowRef, reactive, nextTick } from 'vue'
import { earthPoint, recentData } from '@/utils/map'
import echarts from 'echarts'
import { sqlData } from '@/api/base'

const quakeInfo = ref([])
onBeforeMount(async () => {
  // 获取天内数据
  const { data } = await sqlData(60)
  quakeInfo.value = data
  console.log(quakeInfo)
  nextTick(()=>{
    let myChart = echarts.init(document.getElementById('echart')) 
    myChart.setOption(option)
  })
})

let xAxisData = []
let emphasisStyle = {
  itemStyle: {
    shadowBlur: 10,
    shadowColor: 'rgba(0,0,0,0.3)'
  }
}
let option = {
  legend: {
    data: ['震级','深度'],
    left: '10%'
  },
  tooltip: {},
  xAxis: {
    data: xAxisData,
    name: '星期',
    axisLine: { onZero: true },
    splitLine: { show: false },
    splitArea: { show: false }
  },
  yAxis: {},
  grid: {
    bottom: 100
  },
  series: [
    {
    name: '震级',
    type: 'bar',
    stack: 'one',
    emphasis: emphasisStyle,
    data: [1,1,2,3,4]
  },{
    name: '深度',
    type: 'bar',
    stack: 'two',
    emphasis: emphasisStyle,
    data: [1,1,2,3,2]
  }
  ]
}

</script>

<script>
export default {
  name: 'Home',
  components: {},
}
</script>

<style scoped>
.layout-container {
  height: 44.4375rem;
}
.info-card {
  height: 300px;
  width: 220px;
  display: inline-block;
}
.info {
  text-align: left;
  background-color: aqua;
}
li {
  padding: 0 10px;
  text-align: left;
  font-size: 12px;
  list-style: circle inside url('@/assets/point.gif');
  line-height: 20px;
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
.el-row {
  margin-top: 10px;
}
.el-col {
  border-radius: 5px;
}
</style>
