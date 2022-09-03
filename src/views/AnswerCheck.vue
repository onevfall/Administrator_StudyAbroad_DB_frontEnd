<!--
描述：具体回答审核
作者：王若晗
-->

<template>
  <el-container>
    <el-main v-loading.fullscreen.lock="isLoading"
             element-loading-text="正在加载">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>审核回答</span>
          </div>
        </template>
        <div class="card-content">
          <el-row style="margin-top:20px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">回答ID：</el-col>
            <el-col :span="4" style="text-align:left">{{ answer_info.AnswerId }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">问题标题：</el-col>
            <el-col :span="10" style="text-align:left">{{ answer_info.QuestionTitle }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">回答内容：</el-col>
            <el-col :span="10" style="text-align:left"><p v-html="answer_info.AnswerContent"></p></el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">回答时间</el-col>
            <el-col :span="10" style="text-align:left">{{ answer_info.AnswerDate }}</el-col>
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
import deocde from "../utils/base64"
export default ({
  name: "AnswerCheck",
  data() {
    return {
        ReviewResult:null,
        ReviewReason:null,
        answer_id:2,
        answer_info:[],
        administrator_id:1,
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
        axios.post("check/submit_answer", {
          answer_id:this.answer_id,
          administrator_id:this.administrator_id,
          review_result:this.ReviewResult,
          review_reason:this.ReviewReason,
        })
        .then((res) => {
          console.log(this.answer_id);
          console.log(this.administrator_id);
          console.log(this.ReviewResult);
          console.log(this.ReviewReason);
          console.log(res);
          var response = res.data;
          console.log(response.status);
          console.log(this.answer_info);
          if (response.status == true) {
            //若审核成功
            ElMessage({
              message: "ID为"+this.answer_id+ "的回答审核成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            this.$router.replace({name:"answer_check_center"});
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
    this.answer_id=this.$route.query.answer_id;
    this.administrator_id=this.$store.state.admin_info.administrator_id;
    this.isLoading=true;
    axios({
      url: "check/single_answer",
      method: "get",
      params: {
        answer_id:this.answer_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        this.answer_info=res.data.data;
        this.answer_info.AnswerDate=this.answer_info.AnswerDate.replace("T"," ");
        const xhrFile = new XMLHttpRequest();
        xhrFile.open("GET", this.answer_info.AnswerContent, true);
        xhrFile.send();
        xhrFile.onload = () => {
        this.answer_info.AnswerContent = xhrFile.response;}
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