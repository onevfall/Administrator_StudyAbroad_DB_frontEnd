<!--
描述：回答评论举报详情
作者：张子涵
-->


<template>
  <el-container>
    <el-main v-loading.fullscreen.lock="isLoading"
             element-loading-text="正在加载">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>回答评论举报</span>
          </div>
        </template>
        <div class="card-content">
          <el-row style="margin-top:20px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">回答评论ID：</el-col>
            <el-col :span="4" style="text-align:left">{{ answercomment_info.AnswerCommentId }}</el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">被举报人：</el-col>
            <el-col :span="10" style="text-align:left">
              <div style="display:inline-block;vertical-align:middle">
                  <el-avatar shape="circle" :size="50" :src=" answercomment_info.ReportedUserProfile "/>
              </div>
              <div style="display:inline-block;padding-left:5px;color:black">
                {{ answercomment_info.ReportedUserName }}
              </div>
            </el-col>
          </el-row> 

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">回答评论内容：</el-col>
            <el-col :span="10" style="text-align:left">{{ answercomment_info.AnswerCommentContent }}</el-col>
          </el-row>  


          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">发布时间:</el-col>
            <el-col :span="10" style="text-align:left">{{ answercomment_info.AnswerCommentDate }}</el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">回答或回复内容：</el-col>
            <el-col :span="10" style="text-align:left"><p v-html="answercomment_info.RepliedBlogContent"></p></el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">举报人：</el-col>
            <el-col :span="10" style="text-align:left">
              <div style="display:inline-block;vertical-align:middle">
                  <el-avatar shape="circle" :size="50" :src=" answercomment_info.UserProfile "/>
              </div>
              <div style="display:inline-block;padding-left:5px;color:black">
                {{ answercomment_info.UserName }}
              </div>
            </el-col>
          </el-row> 

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">举报理由:</el-col>
            <el-col :span="10" style="text-align:left">{{ answercomment_info.ReportReason }}</el-col>
          </el-row>

          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">举报时间:</el-col>
            <el-col :span="10" style="text-align:left">{{ answercomment_info.ReportedDate }}</el-col>
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
        BanResult:null,
        ReviewReason:null,
        report_id:0,
        answercomment_id:0,
        answercomment_info:[],
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
        axios.put("admin/check/answercomment", {
          report_id:this.report_id,
          answercomment_id:this.answercomment_id,
          administrator_id:this.administrator_id,
          result:this.ReviewResult,
          ifBanned:this.BanResult,
        })
        .then((res) => {
          console.log(this.answercomment_id);
          console.log(this.administrator_id);
          console.log(this.ReviewResult);
          console.log(res);
          var response = res.data;
          console.log(response.status);
          console.log(this.answercomment_info);
          if (response.status == true) {
            //若审核成功
            ElMessage({
              message: "ID为"+this.answercomment_id+ "的回答评论举报审核成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            this.$router.replace({name:"answer_comment_report_center"});
          }
          else{
            //若审核失败
            ElMessage.error("审核失败！");
            (this.ReviewResult = null), (this.ReviewReason = null),(this.BanResult = null);
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
    this.answercomment_id=this.$route.query.answercomment_id;
    this.isLoading=true;
    axios({
      url: "admin/check/answercomment",
      method: "get",
      params: {
        report_id:this.report_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        this.answercomment_info=res.data.data;
        this.answercomment_info.ReportedDate=this.answercomment_info.ReportedDate;
        this.answercomment_info.AnswerCommentDate=this.answercomment_info.AnswerCommentDate.replace("T"," ");
        if(this.answercomment_info.RepliedAnswerContent==null){
          this.answercomment_info.RepliedAnswerContent=this.answercomment_info.RepliedComment;
          this.answercomment_info.RepliedAnswerDate=this.answercomment_info.RepliedCommentDate;
        }
        console.log(this.answercomment_info.RepliedBlogContent)
        const xhrFile = new XMLHttpRequest();
        xhrFile.open("GET", this.answercomment_info.RepliedBlogContent, true);
        xhrFile.send();
        xhrFile.onload = () => {
        this.answercomment_info.RepliedBlogContent = xhrFile.response;}
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