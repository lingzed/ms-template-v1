<template>
  <el-header class="el-header">
    <!-- 图标部分 -->
    <div class="icon-container" @click="isCollapse = !isCollapse">
      <el-icon size="30">
        <Fold v-if="!isCollapse" />
        <Expand v-if="isCollapse" />
      </el-icon>
    </div>
    <el-breadcrumb class="breadcrumb" separator-icon="ArrowRight">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="index"
        :to="item.children && item.children.length > 0 ? { path: item.path } : ''">
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </el-breadcrumb>

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
          <el-dropdown-menu class="custom-dropdown-menu">
            <el-dropdown-item icon="Setting" class="dropdown-item">设置</el-dropdown-item>
            <el-dropdown-item icon="SwitchButton" @click="outHandle" class="dropdown-item">退出</el-dropdown-item>
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

const filterRoutes = ["index", "home"]
// router.currentRoute是响应式数据，用computed将其从路由中映射出来，得到的依然是一个响应式数据
const breadcrumbs = computed(() => {
  return router
    .currentRoute
    .value
    .matched
    .filter(item => !filterRoutes.includes(item.name));
});

// 退出登录
const outHandle = () => {
  // 清除本地用户信息
  removeLS();
  // 删除vuex中的用户信息
  store.state.userinfo = {};
  store.state.rightList = [];
  removeDynamicRoutes(router); // 删除动态路由
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
}

.icon-container {
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
}

.breadcrumb {
  flex: 1;
  display: flex;
  align-items: center;
}

.header-content {
  display: flex;
  align-items: center;
}

.avatar-container {
  margin-right: 10px;
}

.dropdown-container {
  cursor: pointer;
}

/* 图标和用户名垂直对齐 */
.el-dropdown-link {
  display: flex;
  align-items: center;
}

::v-deep .dropdown-item:hover {
  background-color: green
}
</style>
