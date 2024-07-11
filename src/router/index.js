import { createRouter, createWebHistory } from 'vue-router'
import { getLSItem } from '@/utils/localstorage';
import {
  createDynamicRoute as cdr,
  removeDynamicRoutes as rdr,
  initDynamicRoutes as initR
} from '@/utils/dynamicRoute';
import { errorMsg, msgFields } from '@/utils/msg';

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: "/home"
  },
  {
    path: '/home',
    name: 'home',
    redirect: "/index",
    component: () => import("@/views/layout/index.vue"),
    children: [
      { path: '/index', name: 'index', meta: { title: "首页" }, component: () => import("@/views/home/index.vue") },

    ]
  },
  {
    path: '/login',
    name: 'login',
    meta: { title: "登录" },
    component: () => import("@/views/login/index.vue")
  },
  {
    path: '/:pathMatch(.*)*', // 匹配不满足的路由
    name: '404',
    meta: { title: "404" },
    component: () => import("@/views/404/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 创建动态路由
export function createDynamicRoutes(router, rights) {
  cdr(router, rights);
}

// 删除除基础路由以外的所有动态路由
export function removeDynamicRoutes(router) {
  rdr(router);
}

// 初始化动态路由
initR(router)


// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果当前路由不是登录页面，并且本地没有token，则跳转到登录页面
  if (to.path !== "/login" && !getLSItem("token")) {
    next("/login")
    errorMsg(msgFields.TOKEN_ERROR)
  } else {
    next();
  }
})


export default router
