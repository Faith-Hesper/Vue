<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    default-active="/quakeInformation"
    router
  >
    <h3>管理后台</h3>
    <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path">
      <el-icon><component :is="item.icon"></component></el-icon>
      <span>{{ item.label }}</span>
    </el-menu-item>
    <el-sub-menu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template #title>
        <el-icon><component :is="item.icon"></component></el-icon>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group
        v-for="(subitem, subindex) in item.children"
        :index="item.path"
        :key="item.path"
      >
        <el-menu-item :index="subitem.path" route>{{ subitem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <!-- <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>地震模拟</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1" @click="recent">7天内数据</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu> -->
  </el-menu>
</template>

<script setup>
import { onMounted, ref, inject, computed } from 'vue'
import { recentPonit } from '@/utils/map'

const menu = [
  {
    path: '/',
    name: 'home',
    label: '首页',
    icon: 'house',
    url: '',
  },
  {
    path: '/simulation',
    label: '地震模拟',
    icon: 'location',
    children: [
      {
        path: '/recent',
        name: '',
        label: '7天内数据',
        icon: 'location',
        url: '',
      },
    ],
  },
  {
    path: '/statistic',
    name: '',
    label: '统计上报',
    icon: 'icon-menu',
    url: '',
  },
  {
    path: '/history',
    label: '历史地震',
    icon: 'document',
    children: [
      {
        path: '/quakeInformation',
        name: '',
        label: '地震信息',
        icon: 'location',
        url: '',
      },
    ],
  },
  {
    path: '/themetic',
    name: '',
    label: '专题图',
    icon: 'setting',
    url: '',
  },
]

const recentquakeData = inject('recentquakeData')
console.log(recentquakeData)

const recent = async () => {
  await recentPonit(recentquakeData)
}

// 筛选出无子菜单的菜单集合
const noChildren = computed(() => {
  return menu.filter((item) => !item.children)
})

// 筛选出有子菜单的菜单集合
const hasChildren = computed(() => {
  return menu.filter((item) => item.children)
})

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>

<script>
export default {
  name: 'Aside',
  computed: {
    isCollapse(){
      return this.$store.state.collapseStatus
    }
  }
}
</script>

<style lang="less" scoped>
h3 {
  color: #fff;
  font-size: 15px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>
