import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import InfoPage from '../views/InfoPage.vue'
import NewsCollation from '../views/NewsCollation.vue'
import NewsRelease from '../views/NewsRelease.vue'
import QuestionCheckCenter from '../views/QuestionCheckCenter.vue'
import QuestionCheck from '../views/QuestionCheck.vue'
import AnswerCheckCenter from '../views/AnswerCheckCenter.vue'
import AnswerCheck from '../views/AnswerCheck.vue'
import BlogCheckCenter from '../views/BlogCheckCenter.vue'
import BlogCheck from '../views/BlogCheck.vue'
import ModifyUniversityInfo from '../views/ModifyUniversityInfo.vue'
import SchoolManageCenter from '../views/SchoolManageCenter.vue'
import SchoolDetail from '../views/SchoolDetail.vue'
import InstitutionManageCenter from '../views/InstitutionManageCenter.vue'
import AddSchool from "../views/AddSchool.vue"
import ModifyInstitutionDetail from "../views/ModifyInstitutionDetail.vue"
import QualificationCheckCenter from '../views/QualificationCheckCenter.vue'
import QualificationCheck from '../views/QualificationCheck.vue'

import AnswerReportCenter from '../views/AnswerReportCenter.vue'
import AnswerReport from '../views/AnswerReport.vue'

import BlogReportCenter from '../views/BlogReportCenter.vue'
import BlogReport from '../views/BlogReport.vue'
import AnswerCommentReportCenter from '../views/AnswerCommentReportCenter.vue'
import AnswerCommentReport from '../views/AnswerCommentReport.vue'
import BlogCommentReportCenter from '../views/BlogCommentReportCenter.vue'
import BlogCommentReport from '../views/BlogCommentReport.vue'

import { ElMessage } from 'element-plus'
const routes = [
  {
    path:'/login',
    name:'login',
    component:LoginPage,
    meta:{
      title:'登录'
    }
  },
  {
    path:'/information',
    name:'information',
    component:InfoPage,
    meta:{
      title:'个人信息'
    }
  },
  {
    path:'/news_collation',
    name:'news_collation',
    component:NewsCollation,
    meta:{
      title:'管理留学快讯'
    }
  },
  {
    path:'/news_release',
    name:'news_release',
    component:NewsRelease,
    meta:{
      title:'发布留学快讯'
    }
  },
  {
    path:'/question_check_center',
    name:'question_check_center',
    component:QuestionCheckCenter,
    meta:{
      title:'问题审核中心'
    }
  },
  {
    path:'/question_check',
    name:'question_check',
    component:QuestionCheck,
    meta:{
      title:'问题审核'
    }
  },
  {
    path:'/answer_check_center',
    name:'answer_check_center',
    component:AnswerCheckCenter,
    meta:{
      title:'回答审核中心'
    }
  },
  {
    path:'/answer_check',
    name:'answer_check',
    component:AnswerCheck,
    meta:{
      title:'问题审核'
    }
  },
  {
    path:'/blog_check_center',
    name:'blog_check_center',
    component:BlogCheckCenter,
    meta:{
      title:'动态审核中心'
    }
  },
  {
    path:'/blog_check',
    name:'blog_check',
    component:BlogCheck,
    meta:{
      title:'动态审核'
    }
  },
  {
    path:'/modify_university_info',
    name:'modify_university_info',
    component:ModifyUniversityInfo,
    meta:{
      title:'修改高校信息'
    }
  },
  {
    path:'/manage_school_info',
    name:'manage_school_info',
    component:SchoolManageCenter,
    meta:{
      title:'管理高校信息中心'
    }
  },
  {
    path: '/modify_school_detail',//路径暂且做测试
    name: 'modify_school_detail',
    component: SchoolDetail,
    meta: {
      title: '学校修改详情'
    }
  },
  {
    path: '/add_school',//路径暂且做测试
    name: 'add_school',
    component: AddSchool,
    meta: {
      title: '添加学校'
    }
  },
  {
    path:'/institution_manage_center',
    name:'institution_manage_center',
    component:InstitutionManageCenter,
    meta:{
      title:'管理机构信息中心'
    }
  },
  {
    path:'/modify_institution_detail',
    name:'modify_institution_detail',
    component:ModifyInstitutionDetail,
    meta:{
      title:'管理机构信息中心'
    }
  },
  {
    path:'/qualification_check_center',
    name:'qualification_check_center',
    component:QualificationCheckCenter,
    meta:{
      title:'认证审核中心'
    }
  },
  {
    path:'/qualification_check',
    name:'qualification_check',
    component:QualificationCheck,
    meta:{
      title:'认证审核'
    }
  },
  {
    path:'/answer_report_center',
    name:'answer_report_center',
    component:AnswerReportCenter,
    meta:{
      title:'回答举报中心'
    }
  },
  {
    path:'/answer_report',
    name:'answer_report',
    component:AnswerReport,
    meta:{
      title:'回答举报'
    }
  },

  {
    path:'/blog_report_center',
    name:'blog_report_center',
    component:BlogReportCenter,
    meta:{
      title:'动态举报中心'
    }
  },
  {
    path:'/blog_report',
    name:'blog_report',
    component:BlogReport,
    meta:{
      title:'动态举报'
    }
  },

  {
    path:'/answer_comment_report_center',
    name:'answer_comment_report_center',
    component:AnswerCommentReportCenter,
    meta:{
      title:'回答评论举报中心'
    }
  },
  {
    path:'/answer_comment_report',
    name:'answer_comment_report',
    component:AnswerCommentReport,
    meta:{
      title:'回答评论举报'
    }
  },

  {
    path:'/blog_comment_report_center',
    name:'blog_comment_report_center',
    component:BlogCommentReportCenter,
    meta:{
      title:'动态评论举报中心'
    }
  },
  {
    path:'/blog_comment_report',
    name:'blog_comment_report',
    component:BlogCommentReport,
    meta:{
      title:'动态评论举报'
    }
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(to=>{
  document.title=to.meta.title;//更改标题
})

router.beforeEach(to=>{
  if(to.matched.some(record=>record.meta.requireAuth)){
    //如果需要验证登录状态
    if(store.state.is_login==true){
      return true
    }
    else{
      ElMessage({
        message: '请先登录',
        type: 'warning',
        showClose:true,
        duration:2000
      })
      return{
        path:'/login',
        query:{redirect:to.fullPath}
      }
    }
  }
  else{
    return true
  }
})
export default router
