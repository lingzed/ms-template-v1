import layout from "@/views/layout/index.vue"
import store from "@/store";

/**
 * 动态创建路由，将后台获取的权限数据转化为路由对象，并添加到路由中
 * 
 * @param {Object} router 路由对象
 * @param {Array} rights 权限数组，从后台获取的权限数据
 */
export function createDynamicRoute(router, rights) {
    rights.forEach(r => {
        const route = createRoute(r);
        router.addRoute(route);
    })
}

/**
 * 辅助函数，将权限数据转化为路由对象
 * 
 * @param {Object} right 权限对象
 * @returns 路由规则对象
 */
function createRoute(right) {
    // 定义路由规则对象
    const route = {
        path: right.path,
        name: right.id, // 权限的id来充当路由的名称
        meta: { title: right.authName }, // 路由的元数据，存储按钮的操作权限
        component: null,
        children: null
    }
    if (right.children && right.children.length > 0) {
        route.component = layout
        route.children = right.children.map(r => createRoute(r)); // 递归将子权限转化为路由对象
    } else {
        route.meta.rights = right.rights; // 路由的元数据，存储按钮的操作权限
        route.component = () => import(`@/views${right.path}/index`);
    }
    return route;
}

/**
 * 删除除基础路由以外的所有动态路由
 * 
 * @param {Object} router 路由对象
 */
export function removeDynamicRoutes(router) {
    const names = new Set(); // set集合，存储基础路由名称
    const baseRoutes = router.options.routes // 获取 基础路由规则对象 数组
    getBaseRouteNames(baseRoutes, names); // 调用辅助函数将基础路由名称添加到set集合中
    router.getRoutes().forEach(r => {
        if (!names.has(r.name)) { // 如果路由名称不在set集合中，说明不是基础路由，删除
            router.removeRoute(r.name);
        }
    })
}

/**
 * 辅助函数，通过路由对象获取基础路由名称
 * 为什么使用set而不用数组？因为set不会重复，根据这特点可以快速判断路由名称是否重复
 * 而数组则需要遍历判断，效率低
 * 
 * @param {Array} baseRoutes 基础路由规则对象数组
 * @param {Set} names set集合，存储基础路由名称
 */
function getBaseRouteNames(baseRoutes, names) {
    baseRoutes.forEach(br => {
        names.add(br.name);
        const child = br.children;
        if (child && child.length > 0) { // 如果有子路由，递归调用
            getBaseRouteNames(child, names);
        }
    })
}

/**
 * 1、登录前，页面加载时就会执行，此时vuex中无数据，不会执行创建动态路由的逻辑
 * 2、登录成功后，从后端响应到数据，动态路由创建，
 * 3、登录后，页面刷新，动态路由会丢失，需要重新创建，此时从vuex中获取权限数据，重新创建路由
 * 
 * @param {Object} router 路由对象
 */
export function initDynamicRoutes(router) {
    console.log("页面刷新，从vuex中获取数据创建路由");
    const rights = store.state.rightList; // 从store中获取状态
    if (rights) {
        createDynamicRoute(router, rights)
    }
}