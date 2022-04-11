<!--
 * @Author: Faith
 * @Date: 2022-03-18 16:52
 * @LastAuthor: Faith
 * @LastEditTime: 2022-04-10 18:14
 * @Description: 
-->
<template>
  <!-- <el-aside> -->
  <!-- <el-scrollbar> -->
  <!-- <el-radio-group v-model="isCollapse"> -->
  <div class="aside">
    <!-- <el-button type="primary" @click="btn_expand"
      ><el-icon><component :is="currentIconComponent"></component></el-icon
      >{{ expand_text }}</el-button
    > -->
    <!-- <el-radio-button :label="false">展开</el-radio-button> -->
    <!-- <el-radio-button :label="true">缩回</el-radio-button> -->
    <!-- </el-radio-group> -->
    <el-menu :collapse="isCollapse" @open="handleOpen" @close="handleClose" default-active="1">
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>地震模拟</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1" @click="recent">7天内数据</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>统计上报</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><document /></el-icon>
          <span>历史地震</span>
        </template>
        <el-menu-item-group title="地震查询">
          <el-menu-item index="1-1" @click="rightAsideShow">地震信息</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="4">
        <el-icon><setting /></el-icon>
        <span>Navigator Four</span>
      </el-menu-item>
    </el-menu>
  </div>
  <!-- </el-scrollbar> -->
  <!-- </el-aside> -->
</template>

<script setup>
import { onMounted, ref, inject } from 'vue'
import { recentPonit } from '@/utils/map'

const rAside = ref(false)
const recentquakeData = inject('recentquakeData')
console.log(recentquakeData)

const recent = async () => {
  await recentPonit(recentquakeData)
}

const emit = defineEmits(['rightAside'])

const rightAsideShow = () => {
  rAside.value = rAside.value == true ? false : true
  emit('rightAside', rAside.value)
}
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
}
</script>

<style scoped>
.el-aside {
  /* width: 300px; */
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgb(238, 241, 246);
}
.el-menu {
  left: 0;
  background-color: rgb(238, 241, 246);
}
.aside {
  height: 100%;
  flex-direction: column;
  background-color: rgb(238, 241, 246);
}
</style>
