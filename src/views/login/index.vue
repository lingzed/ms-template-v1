<template>
    <el-card style="width: 400px; margin: 30px auto">
        <el-form label-width="auto" :model="user">
            <el-form-item>
                <el-input v-model="user.username" placeholder="用户名" prefix-icon="User" />
            </el-form-item>
            <el-form-item>
                <el-input v-model="user.password" placeholder="密码" type="password" show-password prefix-icon="Lock" />
            </el-form-item>
            <el-form-item style="margin-bottom: 0">
                <el-button type="primary" style="width: 100%" @click="handleLogin" :loading="loginLoading">登
                    录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useStore } from "vuex"
import { login } from '@/api/login';
import router, { createDynamicRoutes } from '@/router';
import { msgFields, successMsg } from '@/utils/msg';

const loginLoading = ref(false);

const user = reactive({
    username: "",
    password: ""
})

// 通过useStore函数来使用store
const store = useStore();

const handleLogin = async () => {
    loginLoading.value = true;
    try {
        let res = await login(user);
        let result = res.data;
        if (result.code === 1) {
            let rights = result.data.rights;
            // 将jwt和rights存入本地，存入的逻辑在vuex中
            // 通过commit函数来调用mutations中的函数，传入函数名和形参
            store.commit("setUserinfo", result.data.jwt)
            store.commit("setRightList", rights);
            // 动态生成路由，并添加到router中
            createDynamicRoutes(router, rights);
            successMsg(msgFields.LOGIN_SUCCESS)
            router.push("/")
        }
    } catch (error) {
        // 捕获网络错误或其他异常
        console.error("登录时发生错误:", error);
    } finally {
        loginLoading.value = false; // 无论成功还是失败，都关闭加载状态
    }
}
</script>

<style></style>