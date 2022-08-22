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
    <el-menu-item index="login" @click="goLogin" v-if="!this.$store.state.is_login">登录</el-menu-item>
    <el-menu-item index="loginOut" @click="loginOut" v-else>退出登录</el-menu-item>
    <!-- <el-sub-menu index="2">
      <template #title>登录</template>
      <el-menu-item index="2-1" @click="goLogin">登录</el-menu-item>
    </el-sub-menu> -->
  </el-menu>
</template>

<script>
import router from "@/router";
import { ElMessage } from "element-plus";
export default {
  components: {
    ElMessage
  },
  methods: {
    goLogin() {
      router.push({
        name: "login",
      });
    },
    loginOut(){
      this.$store.commit("loginOut");
      ElMessage({
        message: "账号已退出！",
        type: "success",
        showClose: true,
        duration: 2000,
      });
      this.$router.push({
        path: "/login"
      });
    }
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
