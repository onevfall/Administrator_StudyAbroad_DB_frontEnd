<template>
  <el-container>
    <el-header>
      <div id="signInTips">用户登录</div>
    </el-header>
  <el-container>
    <el-aside width="700px">
      <img src="../assets/drawing_login.png" class="drawing" />
    </el-aside>
    <el-main>
      <div class="loginField">
        <div class="inputCard">
          <div class="label">用户id</div>
          <el-row>
            <el-col :span="10">
              <el-input
                v-model="admin_id"
                class="w-50 m-2"
              >
                <template #suffix>
                  <el-icon color="#409eff"><UserFilled /></el-icon>
                </template>
              </el-input>
            </el-col>
          </el-row>
        </div>

        <div class="inputCard">
          <div class="label">密码</div>
          <el-row>
            <el-col :span="10">
              <el-input
                v-model="admin_password"
                class="w-50 m-2"
                type="password"
                clearable
              />
            </el-col>
          </el-row>
        </div>
        <div class="buttonCard">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </el-main>
  </el-container>
  </el-container>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
import store from "@/store";
export default {
  components: { ElMessage },
  data() {
    return {
      admin_id: "",
      admin_password: "",
    };
  },
  methods: {
    login() {
      /*此处日后需要加数据格式验证
          
          */
      axios
        .post("login/admin", {
          id: this.admin_id,
          password: this.admin_password,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data)
          var response = res.data;
          // console.log(response.state);
          if (response.status) {
            var admin_info = response.data;
            //若成功登录
            ElMessage({
              message: admin_info.administrator_name + "，欢迎您！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            store.commit("loginIn", admin_info);
            if (this.$route.query.redirect) {
              //若从其他页面跳转而来则跳转回其他页面
              this.$router.replace(this.$route.query.redirect);
            } else {
              //否则默认到首页
              this.$router.replace("/information");
            }
          } else {
            //若登录失败
            ElMessage.error("管理员id或密码不正确！");
            (this.admin_id = ""), (this.admin_password = "");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  axios,
};
</script>

<style>
#signInTips {
  font-size: 40px;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
}
.drawing {
  height: 550px;
}
.loginField {
  margin-top: 30%;
}
.inputCard {
  color: #409eff;
  margin-top: 10%;
}
.inputCard .label {
  text-align: left;
  margin-bottom: 5px;
}
.buttonCard {
  margin-right: 58%;
  margin-top: 10%;
}
.el-input {
  --el-input-border-color: #a0cfff;
  --el-input-bg-color: #ffffff00;
  --el-input-hover-border-color: #88c3fe;
}
</style>