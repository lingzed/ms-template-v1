import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import { getLSItem } from '@/utils/localstorage';

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
export function createDynamicRoutes(rights) {
  // 避免用户修改本地rights，确保rights是数组且非空
  if (!Array.isArray(rights) || rights.length === 0) return
  console.log(rights);
  rights.forEach(r => {
    const route = abc(r); // 创建路由
    router.addRoute(route);
    console.log(router.getRoutes());
  })

}

const abc = (r) => {
  if (r.children && r.children.length > 0) {
    return {
      path: r.path,
      name: r.id, // 权限的id来充当路由的名称
      meta: { title: r.authName },
      component: () => import(`@/views/layout/index.vue`),
      children: r.children.map(child => abc(child))
    }
  } else {
    return {
      path: r.path,
      name: r.id, // 权限的id来充当路由的名称
      meta: { rights: r.rights, title: r.authName }, // 路由的元数据，存储按钮的操作权限
      component: () => import(`@/views${r.path}/index.vue`)
    }
  }
}

// 删除除基础路由以外的所有动态路由
export function removeDynamicRoutes() {
  const basicRouteNames = routes.map(route => route.name);
  router.getRoutes().forEach(route => {
    if (!basicRouteNames.includes(route.name)) {
      router.removeRoute(route.name);
    }
  });
}

// 页面刷新后，从vuex中获取权限，并初始化动态路由
const init = () => {
  const rights = store.state.rightList; // 从store中获取状态
  if (rights) {
    createDynamicRoutes(rights);
  }
}

init()


// 路由守卫
router.beforeEach((to, from, next) => {
  // 如果当前路由不是登录页面，并且本地没有token，则跳转到登录页面
  if (to.path !== "/login" && !getLSItem("token")) {
    next("/login")
  } else {
    next();
  }
})


export default router
