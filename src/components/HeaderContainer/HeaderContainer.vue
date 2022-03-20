<template>
  <!-- <el-header> -->
  <div class="search">
    <span class="example-demonstration">搜索</span>
    <el-cascader
      v-model="searchArea"
      placeholder="搜索"
      :show-all-levels="false"
      :clearable="true"
      :props="prop"
      filterable
      @change="searchBtn"
    />
  </div>
  Header

  <!-- </el-header> -->
</template>

<script setup>
import { onMounted, ref, reactive, shallowReactive } from 'vue'
import { province_list, city_list, county_list } from '../../utils/areaListPrimary'
import { ponit } from '../../utils/map'
import getCoordsPoint from '../../utils/getCoordsPoint'

const searchArea = ref('110000')
const prop = reactive({
  // expandTrigger: 'hover',
  loading: false,
  // checkStrictly: true, // 取消父子节点关联
  emitPath: false,
  lazy: true,
  lazyLoad(node, resolve) {
    const { level, value } = node
    if (level == 0) {
      resolve(province_list)
    } else if (level == 1) {
      let citys = city_list.filter((item) => {
        // 市前两位与省前两位相同
        return item.value.slice(0, 2) == value.slice(0, 2)
      })
      resolve(citys)
    } else if (level == 2) {
      let countys = county_list.filter((item) => {
        // 县前两位与市前两位相同
        return item.value.slice(0, 2) == value.slice(0, 2)
      })
      countys.forEach((item) => {
        item.leaf = true
      })
      resolve(countys)
    }
  },
})

const searchBtn = async (value) => {
  let points = await getCoordsPoint(1, value)
  await ponit(points)
}

onMounted(() => {
  // dataPro()
})
</script>

<script>
export default {
  name: 'Header',
}
</script>

<style scoped>
.search {
  position: absolute;
  text-align: left;
  padding-left: 10px;
  left: 0%;
}
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
</style>
