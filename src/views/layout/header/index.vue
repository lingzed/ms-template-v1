<template>
  <el-header class="el-header">
    <!-- 图标部分 -->
    <div class="icon-container" @click="isCollapse = !isCollapse">
      <el-icon size="25">
        <Fold v-if="!isCollapse" />
        <Expand v-if="isCollapse" />
      </el-icon>
    </div>
    <div class="header-content">
      <!-- 头像部分 -->
      <div class="avatar-container">
        <el-avatar shape="circle" size="32" :src="headImg"></el-avatar>
      </div>
      <!-- 用户名和下拉菜单部分 -->
      <el-dropdown trigger="click" class="dropdown-container">
        <span class="el-dropdown-link">
          {{ userinfo.username }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item icon="Setting">设置</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" @click="outHandle">退出</el-dropdown-item>
            <!-- 可以添加更多下拉菜单项 -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import router, { removeDynamicRoutes } from '@/router';
import { useStore } from 'vuex'
import { removeLS } from '@/utils/localstorage/index';

// 引入store
const store = useStore()
// 从loyout组件中引入isCollapse
const isCollapse = inject("isCollapse");

// 获取用户信息，通过computed将state中的数据映射出来
const userinfo = computed(() => store.state.userinfo);

const headImg = ref('https://lwn-management.oss-cn-hangzhou.aliyuncs.com/0410fb3c-3527-4b56-a36d-0ca5ec0c9c0a.jpeg');


// 退出登录
const outHandle = () => {
  // 清除本地用户信息
  removeLS();
  // 删除vuex中的用户信息
  store.state.userinfo = {};
  store.state.rightList = [];
  removeDynamicRoutes(); // 删除动态路由
  console.log(router.getRoutes());
  router.push("/login"); // 重定向到登录页面
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  /* 适当增加左右间距 */
}

.icon-container {
  margin-right: auto;
}

.header-content {
  display: flex;
  align-items: center;
  /* 使内容靠右对齐 */
}

.avatar-container {
  margin-right: 10px;
}

.dropdown-container {
  cursor: pointer;
}

/* 图标和用户名垂直对其 */
.el-dropdown-link {
  display: flex;
  align-items: center;
}
</style>
