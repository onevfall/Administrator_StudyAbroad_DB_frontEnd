<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="this.$router.currentRoute.value.name"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="information" @click="goInfomation">
      <span>个人页面</span>
    </el-menu-item>
    <el-menu-item index="3">
      <span>审核</span>
    </el-menu-item>
    <el-menu-item index="4">
      <span>举报处理</span>
    </el-menu-item>
    <el-sub-menu index="5">
      <template #title>高校管理</template>
      <el-menu-item index="5-1">修改高校信息</el-menu-item>
      <el-menu-item index="5-2">修改排名信息</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="6">
      <span>留学快讯管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import router from "@/router";
export default {
  methods: {
    goInfomation() {
      router.push({
        name: "information",
      });
    },
  },
};
</script>

<style></style>
