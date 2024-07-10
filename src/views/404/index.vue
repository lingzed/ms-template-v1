<template>
    <div class="container">
        <div style="flex: 1;">

            <el-image src="/assets/oCkEbrA.png" style="width: 100%;max-width: 450px; margin: 0 auto;" />
        </div>
        <div style="flex: 1;">
            <div style="height: 50px;"></div>
            <div>
                <h1 class="f404">404</h1>
            </div>
            <div style="font-size: 30px;">
                您请求的页面不存在
                <div style="margin-top: 20px;">
                    <el-button icon="back" type="primary" @click="back">返回首页</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const back = () => router.push("/");

</script>

<style>
.container {
    display: flex;
    height: 400px;
    width: 1000px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
}

.f404 {
    font-size: 150px;
    color: #409eff;
    margin: 0
}
</style>