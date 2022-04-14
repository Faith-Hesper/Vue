<template>
  <el-button type="primary" @click="btn_expand"
    ><el-icon :size="20"><component :is="currentIconComponent"></component></el-icon
  ></el-button>
</template>

<script setup></script>

<script>
import { ref } from 'vue'

export default {
  name: 'expandbtn',
  setup(props, context) {
    // 组件名必须加引号
    const currentIconComponent = ref('expand')
    // 默认缩回
    // const expand_text = ref('展开')


    return {
      currentIconComponent,
    }
  },
  methods: {
    btn_expand() {
      this.$store.commit('collapseStatusChange')
      this.currentIconComponent = this.currentIconComponent == 'fold' ? 'expand' : 'fold'
    },
  },
}
</script>

<style scoped>
.el-button {
  /* width: 56px; */
  border-radius: 15%;
  justify-content: center;
  align-items: center;
  margin-left: 0.7rem;
}
</style>
