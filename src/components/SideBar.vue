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
      <el-menu-item index="3-1" @click="goQuestionCheckCenter">审核提问</el-menu-item>
        <el-menu-item index="3-2" @click="goBlogCheckCenter">审核动态</el-menu-item>
        <el-menu-item index="3-3" @click="goAnswerCheckCenter">审核回答</el-menu-item>
        <el-menu-item index="3-4" @click="goQualificationCheckCenter">审核学历</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>举报处理</template>
        <el-menu-item index="4-1" @click="goAnswerReportCenter">回答举报</el-menu-item>
        <el-menu-item index="4-2" @click="goBlogReportCenter">动态举报</el-menu-item>
        <el-menu-item index="4-3" @click="goAnswerCommentReportCenter">回答评论举报</el-menu-item>
        <el-menu-item index="4-4" @click="goBlogCommentReportCenter">动态评论举报</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="5" @click="goManageSchool">
      <span>高校信息管理</span>
    </el-menu-item>
    <el-menu-item index="6" @click="goManageInstitution">
      <span>机构信息管理</span>
    </el-menu-item>
    <el-menu-item index="7" @click="goNewsCollation">
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
    goManageInstitution() {
      router.push({
        name: "institution_manage_center",
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
    goQualificationCheckCenter() {
      router.push({
        name: "qualification_check_center",
      });
    },
    goModifyUniversityInfo() {
      router.push({
        name: "modify_university_info",
      })
    },
    goManageSchool(){
      router.push({
        name: "manage_school_info",
      })
    },    
    goAnswerReportCenter() {
      router.push({
        name: "answer_report_center",
      });
    },
    goBlogReportCenter() {
      router.push({
        name: "blog_report_center",
      });
    },
    goAnswerCommentReportCenter() {
      router.push({
        name: "answer_comment_report_center",
      });
    },
    goBlogCommentReportCenter() {
      router.push({
        name: "blog_comment_report_center",
      });
    },
  },

};
</script>

<style></style>
