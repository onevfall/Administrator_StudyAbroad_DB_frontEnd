import { createRouter, createWebHashHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'
import InfoPage from '../views/InfoPage.vue'
import NewsCollation from '../views/NewsCollation.vue'
import NewsRelease from '../views/NewsRelease.vue'
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
