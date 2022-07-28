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
import QualificationCheckCenter from '../views/QualificationCheckCenter.vue'
import QualificationCheck from '../views/QualificationCheck.vue'
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
