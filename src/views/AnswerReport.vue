<!--
描述：回答举报详情
作者：张子涵
-->


<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>回答举报</span>
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
            <el-col :span="4" style="text-align:left">被举报人：</el-col>
            <el-col :span="10" style="text-align:left">
              <div style="display:inline-block;vertical-align:middle">
                  <el-avatar shape="circle" :size="50" :src=" answer_info.ReportedUserProfile "/>
              </div>
              <div style="display:inline-block;padding-left:5px;color:black">
                {{ answer_info.ReportedUserName }}
              </div>
            </el-col>
          </el-row> 

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">问题内容：</el-col>
            <el-col :span="10" style="text-align:left">{{ answer_info.Question }}</el-col>
          </el-row> 

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">发布时间:</el-col>
            <el-col :span="10" style="text-align:left">{{ answer_info.QuestionDate }}</el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">回答内容：</el-col>
            <el-col :span="10" style="text-align:left"><p v-html="answer_info.AnswerContent"></p></el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">举报人：</el-col>
            <el-col :span="10" style="text-align:left">
              <div style="display:inline-block;vertical-align:middle">
                  <el-avatar shape="circle" :size="50" :src=" answer_info.UserProfile "/>
              </div>
              <div style="display:inline-block;padding-left:5px;color:black">
                {{ answer_info.UserName }}
              </div>
            </el-col>
          </el-row> 

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">举报理由:</el-col>
            <el-col :span="10" style="text-align:left">{{ answer_info.ReportReason }}</el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">举报时间:</el-col>
            <el-col :span="10" style="text-align:left">{{ answer_info.ReportedDate }}</el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left;margin-top:7px">是否审核通过：</el-col>
            <el-col :span="8" style="text-align:left;">
                <el-radio v-model="this.ReviewResult" :label=true size="large"><span style="font-size:20px;font-weight:900">是</span></el-radio>
                <el-radio v-model="this.ReviewResult" :label=false size="large"><span style="font-size:20px;font-weight:900">否</span></el-radio>
            </el-col>
          </el-row>

          <el-row style="margin-top:50px" v-if="this.ReviewResult">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left;margin-top:7px">是否封禁该用户：</el-col>
            <el-col :span="8" style="text-align:left;">
                <el-radio v-model="BanResult" :label=true size="large"><span style="font-size:20px;font-weight:900">是</span></el-radio>
                <el-radio v-model="BanResult" :label=false size="large"><span style="font-size:20px;font-weight:900">否</span></el-radio>
            </el-col>
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
  name: "AnswerReport",
  data() {
    return {
        ReviewResult:null,
        ReviewReason:null,
        BanResult:null,
        report_id:0,
        answer_id:0,
        user_id:0,
        answer_info:[],
        administrator_id:99,
    };
  },
  methods:{
    check:function(){
      if(this.ReviewResult==null)
      {
        ElMessage.error('请选择是否审核通过');
      }
      else{
        axios.put("check/answer", {
          report_id:this.report_id,
          answer_id:this.answer_id,
          administrator_id:this.administrator_id,
          result:this.ReviewResult,
          ifBanned:this.BanResult,
        })
        .then((res) => {
          console.log(this.answer_id);
          console.log(this.administrator_id);
          console.log(this.ReviewResult);
          console.log(res);
          var response = res.data;
          console.log(response.status);
          console.log(this.answer_info);
          if (response.status == true) {
            //若审核成功
            ElMessage({
              message: "ID为"+this.answer_id+ "的回答举报审核成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            this.$router.replace({name:"answer_report_center"});
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
    this.report_id=this.$route.query.report_id;
    this.answer_id=this.$route.query.answer_id;
    this.user_id=this.$route.query.user_id;
    axios({
      url: "check/answer",
      method: "get",
      params: {
        report_id:this.report_id,
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