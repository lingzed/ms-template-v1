<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180" />
            <el-table-column prop="address" label="地址" />
            <el-table-column label="操作">
                <template #default>
                    <el-button type="primary">修改</el-button>
                    <el-button type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { select } from "@/api/users/index"
// import { errorMsg } from "@/utils/msg/index"
const tableData = ref([]);

// 查询数据
const fetchData = async () => {
    try {
        // 查询数据
        const res = await select();
        // 判断是否查询成功
        if (res.data.code === 1) {
            tableData.value = res.data.data;
        }
    } catch (error) {
        console.log(error);
        // errorMsg(error.message);
    }
}

onMounted(() => {
    fetchData();
})


</script>

<style scoped></style>