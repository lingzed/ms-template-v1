import router from "@/router"; // 引入路由
import { errorMsg, msgFields } from "@/utils/msg";

/**
 * 校验请求权限
 * 
 * @param {object} config 请求配置对象
 * @returns 返回bool值
 */
export function validPermission(config) {
    const permission = config.headers['Permission']; // 获取请求头中的请求权限
    if (!permission) return false; // 如果请求头中没有权限，则不放行请求
    const rights = router.currentRoute.value.meta.rights || [] // 获取当前路由的权限，如果没有则为空数组
    console.log(router.currentRoute.value.meta);
    // 如果权限是登录权限，则放行请求，否则判断是否包含权限，包含则放行请求，不包含则不放行请求
    return permission === "login" || rights.includes(permission)
}

/**
 * 生成一个AxiosError对象
 * 
 * @param {number} code 状态码
 * @returns 类AxiosError对象
 */
export function likeAxiosError(code) {
    const AxiosError = {
        response: {
            data: { status: code }
        }
    }
    return AxiosError
}

// 处理响应拦截器中成功的响应返回的Result实体code=0的情况
const code0Map = {
    NOT_LOGIN: () => {
        errorMsg(msgFields.TOKEN_ERROR) // token过期
        router.push({ path: '/login' }); // 重定向到登录页面
    },
    ACCOUNT_ERROR: () => errorMsg(msgFields.ACCOUNT_ERROR), // 账号错误
    NOT_PERMISSION: () => errorMsg(msgFields.NOT_PERMISSION), // 没有权限
}

// 错误处理
const errorMap = {
    isCode: { // 如果error中没有response，则使用code判断
        ERR_NETWORK: () => errorMsg(msgFields.ERR_NETWORK), // 响应状态为网络错误时，处理方式
        ECONNABORTED: () => errorMsg(msgFields.REQUEST_TIMEOUT), // 响应状态为请求超时时，处理方式
    },
    isResponse: { // 如果error中有response，则使用response中的状态码处理
        500: () => errorMsg(msgFields.SYSTEM_ERROR), // 响应状态500时，处理方式
        401: () => errorMsg(msgFields.TOKEN_ERROR), // 响应状态401时，处理方式
        403: () => errorMsg(msgFields.NOT_PERMISSION), // 响应状态403时，处理方式
    }
}

export {
    code0Map,
    errorMap
}