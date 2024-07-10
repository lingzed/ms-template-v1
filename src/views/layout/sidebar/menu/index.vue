<!-- 如果菜单没有子项，则用el-menu-item，否则用el-sub-menu -->
<template>
    <el-menu-item v-if="!item.children" :index="item.path">
        <el-icon v-if="item.icon">
            <component :is="item.icon" />
        </el-icon>
        <span>{{ item.authName }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="item.path" :class="isApplyActive(item) ? 'sub-active' : ''">
        <template #title>
            <el-icon v-if="item.icon" :class="isApplyActive(item) ? 'icon-active' : ''">
                <component :is="item.icon" />
            </el-icon>
            <span :class="isApplyActive(item) ? 'span-active' : ''">{{ item.authName }}</span>
        </template>

        <menu-item v-for="child in item.children" :key="child.id" :item="child" />
    </el-sub-menu>
</template>

<script setup>
import { defineProps, inject } from 'vue';
import MenuItem from "@/views/layout/sidebar/menu/index.vue"
import { useRoute } from 'vue-router';

defineProps({
    item: {
        type: Object,
        required: true
    }
});

const isCollapse = inject("isCollapse")
console.log(isCollapse);

const route = useRoute();

const isApplyActive = (item) => {
    return isCollapse.value && item.children.some(child => child.path === route.path);
}

</script>

<style scoped>
.sub-active {
    background-color: #1f2d3d !important;
    color: #ffd04b !important;
}

.span-active {
    color: #ffd04b !important;
}

.icon-active {
    color: #ffd04b !important;
}
</style>