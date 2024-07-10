<template>
  <div class="common-layout">
    <el-container>
      <sidebar />
      <el-container class="main-container">
        <aHeader />
        <aMain />
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { provide, ref } from 'vue'
import aHeader from "@/views/layout/header/index.vue"
import aMain from "@/views/layout/main/index.vue"
import sidebar from "@/views/layout/sidebar/index.vue"

// 在layout中定义一个全局变量，用来控制侧边栏的折叠和展开
const isCollapse = ref(false)
// 暴露给子组件使用
provide("isCollapse", isCollapse)
</script>

<style scoped>
.common-layout {
  height: 100vh;
}

.main-container {
  display: flex;
  /* 垂直排列 */
  flex-direction: column;
  /* 充满父容器的剩余空间 */
  flex: 1;

}
</style>