<template>
    <el-aside :width="isCollapse ? '64px' : '200px'" class="el-aside">
        <el-scrollbar>
            <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                text-color="#fff" router="true" :collapse="isCollapse" :default-active="activeIndex"
                collapse-transition="true">
                <el-menu-item style="height: 60px;background-color: #303133;">
                    <el-icon style="margin-right: 10px;">
                        <img src="@/assets/logo.png" width="30px" height="30px" />
                    </el-icon>
                    <span v-show="!isCollapse" style="font-size: 20px;font-weight: bold;">xxx管理系统</span>
                </el-menu-item>
                <el-menu-item index="/index">
                    <el-icon>
                        <HomeFilled />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <menu-item v-for="(item, index) in menuTree" :key="index" :item="item" />
            </el-menu>
        </el-scrollbar>
    </el-aside>

</template>

<script setup>
import { computed, inject, ref, watchEffect } from 'vue'
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import MenuItem from "@/views/layout/sidebar/menu/index.vue"
// 从layout中引入isCollapse
const isCollapse = inject("isCollapse")

const store = useStore()
// computed函数获取state中的数据，将获取到的数据赋值给menuTree
const menuTree = computed(() => store.state.rightList) // computed返回的就是一个响应式对象，因此不需要ref

const activeIndex = ref("/"); // activeIndex属性进行响应式
const route = useRoute();

// 根据当前路由路径设置激活状态和展开状态
const setActiveIndex = (path) => {
    activeIndex.value = path;
};

// 在路由变化时更新激活状态和展开状态
watchEffect(() => {
    // 由router实例的path属性，拿到当前的路由
    setActiveIndex(route.path);
});
</script>

<style scoped>
.el-aside {
    background-color: #545c64;
    /* 让侧边栏高度充满父容器 */
    height: 100vh;
    transition: width 0.4s;
    /* 添加过渡效果 */
}

.el-menu {
    border: none !important;
}

/* 自定义激活样式 */
::v-deep .el-menu-item.is-active {
    background-color: #1f2d3d !important;
    color: #ffd04b !important;
}
</style>