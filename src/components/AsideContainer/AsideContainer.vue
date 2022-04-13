<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    active-text-color="#ffd04b"
    background-color="#545c64"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
    default-active="/"
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
      </el-sub-menu>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><document /></el-icon>
          <span>历史地震</span>
        </template>
        <el-menu-item-group title="地震查询">
          <el-menu-item index="1-1" @click="rightAsideShow">地震信息</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu> -->
  </el-menu>
  <!-- </el-aside> -->
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
const rAside = ref(false)
const recentquakeData = inject('recentquakeData')
console.log(recentquakeData)

const recent = async () => {
  await recentPonit(recentquakeData)
}

const emit = defineEmits(['rightAside'])

const noChildren = computed(() => {
  return menu.filter((item) => !item.children)
})
const hasChildren = computed(() => {
  return menu.filter((item) => item.children)
})
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
// const rightAsideShow = () => {
//   rAside.value = !rAside.value
//   emit('rightAside', rAside.value)
// }
</script>

<script>
export default {
  name: 'Aside',
  props: {
    isCollapse: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    isCollapse(){
      return this.$store.state.isCollapse
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
