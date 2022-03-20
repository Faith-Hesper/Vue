<template>
  <!-- <el-aside> -->
  <!-- <el-scrollbar> -->
  <!-- <el-radio-group v-model="isCollapse"> -->
  <div class="aside">
    <el-button type="primary" @click="btn_expand"
      ><el-icon><component :is="currentIconComponent"></component></el-icon
      >{{ expand_text }}</el-button
    >
    <!-- <el-radio-button :label="false">展开</el-radio-button> -->
    <!-- <el-radio-button :label="true">缩回</el-radio-button> -->
    <!-- </el-radio-group> -->
    <el-menu
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
      default-active="1"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">item one</el-menu-item>
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
  import { onMounted, ref } from "vue";

  // 组件名必须加引号
  let currentIconComponent = ref("expand");
  let expand_text = ref("展开");
  let times = 0;
  // 默认缩回
  let isCollapse = ref(true);
  const handleOpen = (key, keyPath) => {
    // console.log(key, keyPath)
  };
  const handleClose = (key, keyPath) => {
    // console.log(key, keyPath)
  };
  function btn_expand() {
    if (times == 0) {
      isCollapse.value = false;
      currentIconComponent.value = "fold";
      expand_text.value = "缩回";
      times++;
    } else {
      isCollapse.value = true;
      currentIconComponent.value = "expand";
      // console.log('111',isCollapse);
      expand_text.value = "";
      times = 0;
    }
  }
</script>
<script>
export default {
  setup() {},
};
</script>

<style scoped>
.el-button {
  width: 65px;
  justify-content: center;
  align-items: center;
}
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
