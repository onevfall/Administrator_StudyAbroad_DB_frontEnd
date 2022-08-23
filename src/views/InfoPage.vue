<template>
  <el-container>
    <el-side></el-side>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>个人信息</span>
          </div>
        </template>
        <el-row class="info-name">
          <el-col :span="6"></el-col>
          <el-col :span="10" id="name" style="text-align:left">
            <el-input v-model="name" v-if="isUpdating['name']"></el-input>
            <div v-if="!isUpdating['name']">{{name}}（用户名）</div>
          </el-col>
          <el-col :span="4" style="text-align:left">
            <el-button text="primary" type="primary" v-if="!isUpdating['name']" @click="update('name')">修改</el-button>
            <el-button text="primary" type="primary" v-if="isUpdating['name']" @click="confirm('name')">确认</el-button>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        
        <el-row class="info-content">
          <el-col :span="6"></el-col>
          <el-col :span="4" style="text-align:left">id</el-col>
          <el-col :span="6" style="text-align:left">{{admin_id}}</el-col>
          <el-col :span="6"></el-col>
        </el-row>

        <el-row class="info-content">
          <el-col :span="6"></el-col>
          <el-col :span="4" style="text-align:left">性别</el-col>
          <el-col :span="6" style="text-align:left">
            <el-input v-model="gender" v-if="isUpdating['gender']"></el-input>
            <div v-if="!isUpdating['gender']">{{gender}}</div>
          </el-col>
          <el-col :span="4" style="text-align:left">
            <el-button text="primary" type="primary" v-if="!isUpdating['gender']" @click="update('gender')">修改</el-button>
            <el-button text="primary" type="primary" v-if="isUpdating['gender']" @click="confirm('gender')">确认</el-button>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>

        <el-row class="info-content">
          <el-col :span="6"></el-col>
          <el-col :span="4" style="text-align:left">手机号</el-col>
          <el-col :span="6" style="text-align:left">
            <el-input v-model="phone" v-if="isUpdating['phone']"></el-input>
            <div v-if="!isUpdating['phone']">{{phone}}</div>
          </el-col>
          <el-col :span="4" style="text-align:left">
            <el-button text="primary" type="primary" v-if="!isUpdating['phone']" @click="update('phone')">修改</el-button>
            <el-button text="primary" type="primary" v-if="isUpdating['phone']" @click="confirm('phone')">确认</el-button>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        
        <el-row class="info-content">
          <el-col :span="6"></el-col>
          <el-col :span="4" style="text-align:left">邮箱</el-col>
          <el-col :span="6" style="text-align:left">
            <el-input v-model="email" v-if="isUpdating['email']"></el-input>
            <div v-if="!isUpdating['email']">{{email}}</div>
          </el-col>
          <el-col :span="4" style="text-align:left">
            <el-button text="primary" type="primary" v-if="!isUpdating['email']" @click="update('email')">修改</el-button>
            <el-button text="primary" type="primary" v-if="isUpdating['email']" @click="confirm('email')">确认</el-button>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>

        <el-row class="info-content">
          <el-col :span="6"></el-col>
          <el-col :span="4" style="text-align:left">注册时间</el-col>
          <el-col :span="6" style="text-align:left">{{create_time}}</el-col>
          <el-col :span="4" style="text-align:left"></el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import store from "@/store";
import { ElMessage } from 'element-plus'
export default {
  name: "InfoPage",
  components:{
    ElMessage
  },
  data() {
    return {
      admin_id: -1,
      name: "",
      profile: "",
      gender: "",
      phone: "",
      email: "",
      create_time: "",
      isUpdating: {"name":false,"gender":false,"phone":false,"email":false},
    };
  },
  methods: {
    update: function(key) {
      this.isUpdating[key] = true;
    },
    confirm: function(key) {
      this.isUpdating[key] = false;
      console.log(this.phone);
      axios.post("administrator",{
        admin_id: this.admin_id,
        admin_name: this.name,
        admin_gender: this.gender == "女" ? 'f' : 'm',
        admin_phone: this.phone,
        admin_email: this.email,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
    },
  },
  created() {
    if (!this.$store.state.is_login) {
      ElMessage({
        message: "请先登录",
        type: "warning",
        showClose: true,
        duration: 2000,
      });
      /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
      this.$router.push({
        path: "/login",
        query: { redirect: this.$route.fullPath },
      });
    }
    this.admin_id = this.$store.state.admin_info.administrator_id
    this.name = this.$store.state.admin_info.administrator_name
    this.profile = this.$store.state.admin_info.administrator_profile
    this.gender = this.$store.state.admin_info.administrator_gender
    this.phone= this.$store.state.admin_info.administrator_phone
    this.email= this.$store.state.admin_info.administrator_email
    this.create_time= this.$store.state.admin_info.administrator_createtime.replace("T"," ")
  }
};
</script>

<style scoped>
  .el-main{
    padding:50px 30px 30px 50px;
  }
  .box-card{
    border-radius:10px;
    height:600px;
  }
  .card-header{
    text-align:left;
    font-family:SimSun;
    font-size:40px;
    font-weight:900;
    padding-left:15%;
    padding-top:20px;
  }
  .info-content{
    font-family:SimSun;
    font-size:20px;
    padding-top:20px;
    padding-bottom:20px;
    font-weight:bolder;
    margin-left:5%;
    margin-right:5%;
  }
  .info-name{
    font-family:SimSun;
    font-size:25px;
    padding-top:20px;
    padding-bottom:20px;
    font-weight:bolder;
    border-bottom:solid 0.8px black;
    margin-left:5%;
    margin-right:5%;
  }
</style>
