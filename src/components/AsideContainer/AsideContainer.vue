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
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1" @click="recent">7天内数据</el-menu-item>
          <el-menu-item index="1-2">item one</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title>item four</template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon><document /></el-icon>
        <span>Navigator Three</span>
      </el-menu-item>
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

const recentquakeData = inject('recentquakeData')
console.log(recentquakeData)
const recent = async () => {
  await recentPonit(recentquakeData)
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
  flex-direction: column;
  background-color: rgb(238, 241, 246);
}
</style>
