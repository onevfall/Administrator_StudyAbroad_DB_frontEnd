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
    <el-sub-menu index="3">
      <template #title>审核</template>
      <el-menu-item index="3-1" @click="goQuestionCheckCenter">审核问题</el-menu-item>
        <el-menu-item index="3-2" @click="goBlogCheckCenter">审核动态</el-menu-item>
        <el-menu-item index="3-3" @click="goAnswerCheckCenter">审核回答</el-menu-item>
        <el-menu-item index="3-4">审核学历</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="4">
      <span>举报处理</span>
    </el-menu-item>
    <el-sub-menu index="5">
      <template #title>高校管理</template>
      <el-menu-item index="5-1" @click="goModifyUniversityInfo">修改高校信息</el-menu-item>
      <el-menu-item index="5-2">修改排名信息</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="6" @click="goNewsCollation">
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
    goNewsCollation() {
      router.push({
        name: "news_collation",
      });
    },
    goQuestionCheckCenter() {
      router.push({
        name: "question_check_center",
      });
    },
    goAnswerCheckCenter() {
      router.push({
        name: "answer_check_center",
      });
    },
    goBlogCheckCenter() {
      router.push({
        name: "blog_check_center",
      });
    },
    goModifyUniversityInfo() {
      router.push({
        name: "modify_university_info",
      })
    }
  },
};
</script>

<style></style>
