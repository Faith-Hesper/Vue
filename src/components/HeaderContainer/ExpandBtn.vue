<template>
  <el-button type="primary" @click="btn_expand" 
    ><el-icon :size="20"><component :is="currentIconComponent"></component></el-icon
    ></el-button
  >
</template>

<script setup></script>

<script>
import { ref } from 'vue'

export default {
  emits: ['btnClicked'],
  setup(props, context) {
    // 组件名必须加引号
    const currentIconComponent = ref('expand')
    // 默认缩回
    // const expand_text = ref('展开')
    const isCollapse = ref(true)
    const times = ref(0)

    function btn_expand() {
      if (times.value == 0) {
        isCollapse.value = false
        context.emit('btnClicked',isCollapse.value)
        currentIconComponent.value = 'fold'
        // expand_text.value = '缩回'
        times.value = 1
      } else {
        isCollapse.value = true
        context.emit('btnClicked',isCollapse.value)
        currentIconComponent.value = 'expand'
        // expand_text.value = ''
        times.value = 0
      }
    }
    // console.log()
    return {
      currentIconComponent,
      // expand_text,
      isCollapse,
      btn_expand,
      times
    }
  },
}
</script>

<style scoped>
.el-button {
  width: 56px;
  border-radius: 15%;
  justify-content: center;
  align-items: center;
  margin-left: 0.7rem;
}
</style>
