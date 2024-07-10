import router from "@/router"

// 导出函数，接收app参数，在main.js中调用，传入app实例，在全局注册指令
export default function permissionDirective(app) {
    app.directive("permission", {
        mounted(el, binding) {
            const meta = router.currentRoute.value.meta // 获取当前路由的meta中的权限信息
            const { action, style } = binding.value; // 获取当前用户拥有的按钮行为权限
            // 判断当前用户是否拥有该按钮权限，如果拥有则正常渲染，否则对按钮进行禁用或移除操作
            if (!meta.rights.includes(action)) {
                btnStyle[style](el); // 根据sytle，执行不同的渲染
            }
        }
    })
}

// 定义一个对象，存储不同的渲染
const btnStyle = {
    // 禁用按钮
    DISABLE: (el) => {
        el.disabled = true;
        el.classList.add("is-disabled")
    },
    // 移除按钮
    REMOVE: (el) => {
        el.parentNode.removeChild(el);
    }
}