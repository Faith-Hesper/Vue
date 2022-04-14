<template>
  <!-- <el-header> -->
  <ExpandBtn></ExpandBtn>
  <div class="search">
    <span class="example-demonstration">搜索: </span>
    <el-cascader
      v-model="searchArea"
      placeholder="搜索"
      :show-all-levels="false"
      :clearable="true"
      :props="prop"
      :options="province_list"
      @change="searchBtn"
      filterable    

    />
  </div>
  <div class="header">Header</div>
  <!-- :filter-method="filterMethod" -->
  <!-- </el-header> -->
</template>

<script setup>
import { onMounted, ref, reactive, shallowReactive } from 'vue'
import ExpandBtn from '@/components/HeaderContainer/ExpandBtn.vue'
import { province_list, city_list, county_list } from '@/utils/areaListPrimary'
import { ponit } from '@/utils/map'
import getCoordsPoint from '@/utils/getCoordsPoint'

// import { earthquake } from '@/api/base'

const searchArea = ref('110000')
const prop = reactive({
  // expandTrigger: 'hover',
  loading: false,
  checkStrictly: true, // 取消父子节点关联
  emitPath: false,
  lazy: true,
  lazyLoad(node, resolve) {
    const { level, value } = node
    if (level == 0) {
      resolve(province_list)
    } else if (level == 1) {
      let citys = city_list.filter((item) => {
        // 市前两位与省前两位相同
        if(item.value.slice(0, 2) == value.slice(0, 2))
        {
          province_list.children = item
          return true
        }
      })
      resolve(citys)
    } else if (level == 2) {
      let countys = county_list.filter((item) => {
        // 县前两位与市前两位相同
        if(item.value.slice(0, 2) == value.slice(0, 2) && item.value.slice(3, 4) == value.slice(3, 4)){
          city_list.children = item
          return true
        }
      })
      countys.forEach((item) => {
        item.leaf = true
      })
      resolve(countys)
    }
  },
})

// 搜索避难所
const searchBtn = async (value) => {
  let points = await getCoordsPoint(1, value)
  await ponit(points)
}

</script>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.search {
  /* position: absolute; */
  /* order: -5; */
  /* text-align: left; */
  padding-left: 5%;
  left: 20%;
}
.header{
  left: 50%;
  position: absolute;
}
</style>
