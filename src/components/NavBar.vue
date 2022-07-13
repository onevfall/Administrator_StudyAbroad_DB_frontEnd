<template>
  <el-menu
    :default-active="this.$router.currentRoute.value.name"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <img src="../assets/logo.png" class="logo" />
    </el-menu-item>
    <div class="flex-grow" />
    <el-menu-item index="1">
      <el-icon><Search /></el-icon> 联系我们
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>登录\注册</template>
      <el-menu-item index="2-1" @click="goLogin">登录</el-menu-item>
      <el-menu-item index="2-2">注册</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import router from "@/router";
export default {
  methods: {
    goLogin() {
      router.push({
        name: "login",
      });
    },
  },
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.logo {
  height: 56px;
}
</style>
