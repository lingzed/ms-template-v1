import axios from 'axios'; // 导入axios
import { msgFields, errorMsg } from '../msg';
import { validPermission, likeAxiosError, code0Map, errorMap } from './utils';

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: 'http://localhost:8099/', // API基础URL
    withCredentials: true, // 允许跨域请求时携带凭证（如 cookies、HTTP 认证头）
    timeout: 10000, // 超时10s
});

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token'); // 从localStorage中获取令牌，假设令牌的key为token
        if (token) {
            config.headers['token'] = token; // 如果存在令牌，则将令牌添加到请求头中
        }
        if (!validPermission(config)) { // 验证请求的权限
            return Promise.reject(likeAxiosError(403)); // 请求无权限，返回错误
        }

        return config; // 放行请求
    },
    error => {
        console.error("请求拦截器error回调执行：", error);
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // 如果响应成功，但是响应的Result实体code为0，则提示错误信息
        if (response.data.code === 0) {
            const msg = response.data.msg;
            code0Map[msg] && code0Map[msg](); // 调用对应处理方法
        }
        return response; // 放行响应
    },
    error => {
        console.error("响应拦截器error回调执行：", error)
        if (error.response) {
            const { status } = error.response.data
            errorMap.isResponse[status] && errorMap.isResponse[status](); // 如果error中有response，那就用response中的状态码判断
        } else {
            if (!errorMap.isCode[error.code]) { // 未知的错误
                errorMsg(msgFields.UNDEFINED_ERROR)
                return Promise.reject(error);
            }
            errorMap.isCode[error.code](); // 如果error中没有response，那就用code判断
        }
        return Promise.reject(error);
    }
);

export default instance;