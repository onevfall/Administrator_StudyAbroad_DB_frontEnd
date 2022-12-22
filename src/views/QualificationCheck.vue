<!--
描述：具体学历审核
作者：王若晗
-->

<template>
  <el-container>
    <el-main v-loading.fullscreen.lock="isLoading"
             element-loading-text="正在加载">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>审核学历</span>
          </div>
        </template>
        <div class="card-content">
          <el-row style="margin-top:20px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">认证信息ID：</el-col>
            <el-col :span="4" style="text-align:left">{{ qualification_info.identityId }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">用户名称：</el-col>
            <el-col :span="10" style="text-align:left">{{ qualification_info.userName }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">学校：</el-col>
            <el-col :span="10" style="text-align:left">{{ qualification_info.universityChName }} {{ qualification_info.universityEnName }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">学历：</el-col>
            <el-col :span="10" style="text-align:left">{{ qualification_info.identity }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">专业：</el-col>
            <el-col :span="10" style="text-align:left">{{ qualification_info.major }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">就读时间：</el-col>
            <el-col :span="10" style="text-align:left">{{ qualification_info.enrollmentTime }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">提交时间：</el-col>
            <el-col :span="10" style="text-align:left">{{ qualification_info.summitDate }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">认证图片：</el-col>
            <el-col :span="10" style="text-align:left">
                <img :src="qualification_info.identityImage" style="width:400px"/>
            </el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left;margin-top:7px">是否审核通过：</el-col>
            <el-col :span="8" style="text-align:left;">
                <el-radio v-model="ReviewResult" label=true size="large"><span style="font-size:20px;font-weight:900">是</span></el-radio>
                <el-radio v-model="ReviewResult" label=false size="large"><span style="font-size:20px;font-weight:900">否</span></el-radio>
            </el-col>
          </el-row>
            <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">审核批注：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="ReviewReason" placeholder="请输入审核批注" clearable/></el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="12"></el-col>
            <el-col :span="4" style="text-align:left">
              <el-button type="primary" @click="check" style="font-size:20px;width:80px;font-family:SimSun;font-weight:900">提交</el-button>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { ElMessage } from 'element-plus'
import axios from "axios";
export default ({
  name: "QualificationCheck",
  data() {
    return {
        ReviewResult:null,
        ReviewReason:null,
        qualification_id:10,
        qualification_info:[],
        administrator_id:99,
        isLoading:false,
    };
  },
  methods:{
    check:function(){
      if(this.ReviewResult==null)
      {
        ElMessage.error('请选择是否审核通过');
      }
      else{
        axios.post("admin/check/submit_qualification", {
          identity_id:this.qualification_id,
          administrator_id:this.administrator_id,
          review_result:this.ReviewResult,
          review_reason:this.ReviewReason,
        })
        .then((res) => {
          console.log(res);
          var response = res.data;
          console.log(response.status);
          console.log(this.qualification_info);
          if (response.status == true) {
            //若审核成功
            ElMessage({
              message: "ID为"+this.qualification_id+ "的学历信息审核成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            this.$router.replace({name:"qualification_check_center"});
          }
          else{
            //若审核失败
            ElMessage.error("审核失败！");
            (this.ReviewResult = null), (this.ReviewReason = null);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
    }
  },
  created(){
    this.qualification_id=this.$route.query.qualification_id;
    this.administrator_id=this.$store.state.admin_info.administrator_id;
    this.isLoading=true;
    axios({
      url: "admin/check/single_qualification",
      method: "get",
      params: {
        identity_id:this.qualification_id,
      },
      })
      .then((res) => {
        console.log(res);
        this.qualification_info=res.data.data;
        this.qualification_info.summitDate=this.qualification_info.summitDate;
        this.isLoading=false;
      })
      .catch((err) => {
        console.log(err);
      });
  }
})
</script>

<style scoped>
  .el-main{
    padding:50px 30px 30px 50px;
  }
  .box-card{
    border-radius:10px;
  }
  .card-header{
    text-align:left;
    font-family:SimSun;
    font-size:40px;
    font-weight:900;
    padding-left:15%;
    padding-top:30px;
  }
  .card-content{
    font-family:SimSun;
    text-align:left;
    font-size:20px;
    font-weight:900;
  }
</style>