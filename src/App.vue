<template>
  <div class="common-layout">
    <el-container :style="{height:this.screen_height-16+'px'}">
      <el-aside width="200px" id='SideBar'><side-bar/></el-aside>
      <el-container>
        <el-header><nav-bar /></el-header>
        <el-main ><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue'
import NavBar from './components/NavBar.vue'
export default ({
  components:{
    SideBar,
    NavBar
  },
  data(){
    return{
      screen_height:window.innerHeight
    }
  },
   mounted(){
    this.$router.replace('/login')
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
#SideBar{
  background-color: #545c64;
}
</style>
