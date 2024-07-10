<template>
    <div>
        <el-button type="primary" v-permission="{ action: 'ADD', style: 'REMOVE' }"
            style="margin-bottom: 10px;">新增</el-button>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="商品名称" width="180" />
            <el-table-column prop="price" label="价格" />
            <el-table-column label="操作">
                <template #default>
                    <el-button type="primary" v-permission="{ action: 'EDIT', style: 'DISABLE' }"
                        @click="edithandle">修改</el-button>
                    <el-button type="danger" v-permission="{ action: 'DELETE', style: 'DISABLE' }">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { edit, select } from "@/api/goods/index.js"
const tableData = ref([]);
import { errorMsg, msgFields, successMsg } from '@/utils/msg/index';

const fetchData = async () => {
    try {
        const res = await select();
        if (res.data.code === 1) {
            tableData.value = res.data.data;
        }
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchData();
})

const edithandle = async () => {
    try {
        const res = await edit();
        if (res.data.code === 1) {
            successMsg(msgFields.EDIT_SUCCESS)
        } else {
            errorMsg(msgFields.EDIT_FAILURE)
        }
    } catch (error) {
        console.log(error.message);
    }

}


</script>

<style scoped></style>