<!--
描述：回答举报中心
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
        <el-scrollbar height="370px">
          <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
            <el-tab-pane label="未审核" name="first">
              <div class="check-content">
                <el-row>
                  <el-col :span="6" style="text-align:left;padding-left:8%">回答</el-col>
                  <el-col :span="8" >举报理由</el-col>
                  <el-col :span="6" >举报用户</el-col>
                  <el-col :span="4" >操作</el-col>
                </el-row>
              </div>
              <div class="check-content" v-for="ans in this.answer_tocheck_info" :key="ans">
                <el-row>
                  <el-col :span="6" style="text-align:left">
                    <div style="font-size:20px;color:black">{{ ans.AnswerSummary }}</div>
                    <div style="margin-top:10px">{{ ans.ReportDate }}</div>
                  </el-col>
                  <el-col :span="8" >
                    <div>{{ans.ReportReason}}</div>
                  </el-col>
                  <el-col :span="6" style="padding-top:1%">
                    <div style="display:inline-block;vertical-align:middle">
                      <el-avatar shape="circle" :size="50" :src=" ans.UserProfile "/>
                    </div>
                    <div style="display:inline-block;padding-left:5px;color:black">{{ ans.UserName }}</div>
                  </el-col>
                  <el-col :span="4" style="color:#2297FA;padding-top:2%" >
                    <el-button type="primary" @click="goReportCheck(ans.ReportId,ans.AnswerId,ans.UserId,ans)" id="check-text" style="width:100px">
                      <el-icon><Edit /></el-icon>去处理
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已审核" name="second">
              <div class="check-content">
                <el-row>
                  <el-col :span="6" style="text-align:left;padding-left:8%">回答</el-col>
                  <el-col :span="8" >举报理由</el-col>
                  <el-col :span="6" >举报用户</el-col>
                  <el-col :span="4" >审核结果</el-col>
                  
                </el-row>
              </div>
              <div class="check-content" v-for="ans in this.answer_checked_info" :key="ans">
                <el-row>
                  <el-col :span="6" style="text-align:left">
                    <div style="font-size:20px;color:black">{{ ans.AnswerSummary }}</div>
                    <div style="margin-top:10px">{{ ans.ReportDate }}</div>
                  </el-col>
                  <el-col :span="8" >
                    <div>{{ans.ReportReason}}</div>
                  </el-col>
                  <!--
                  -->
                  <el-col :span="6" style="padding-top:1%">
                    <div style="display:inline-block;vertical-align:middle">
                      <el-avatar shape="circle" :size="50" :src=" ans.UserProfile "/>
                    </div>
                    <div style="display:inline-block;padding-left:5px;color:black">{{ ans.UserName }}</div>
                  </el-col>
                  <el-col :span="4">
                    <div v-if="ans.ReportAnswerResult==true" style="color:#93CB74;font-size:18px;margin-top:5px;">通过</div>
                    <div v-if="ans.ReportAnswerResult==false" style="color:#CE2E3E;font-size:18px;margin-top:5px;">不通过</div>
                    <div style="font-size:13px;margin-top:10px">{{ ans.ReviewDate }}</div>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-scrollbar>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default ({
  name: "AnswerReportCenter",
  data() {
    return {
      answer_tocheck_info:[],
      answer_checked_info:[],
      activeName:"first",
    };
  },
  components:{
    ElMessage
  },
  methods:{
    goReportCheck:function(rep_id,ans_id,use_id,ans){
      this.$router.push({
        name:"answer_report",
        query: { 
            report_id: rep_id,
            answer_id: ans_id,
            user_id: use_id,
         }
      });
    }
  },
  created(){
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
    axios({
      url: "/check/answer_report/solved",
      method: "get",
      })
      .then((res) => {
        console.log(res.data.data);
        this.answer_checked_info=res.data.data.answer_report;
        //console.log(this.answer.checked_info);
      })
      .catch((err) => {
        console.log(err);
      });
      axios({
      url: "/check/answer_report/unsolved",
      method: "get",
      })
      .then((res) => {
        console.log(res.data.data);
        this.answer_tocheck_info=res.data.data.answer_report;
        //console.log(this.answer.checked_info);
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
    height:600px;
  }

  .card-header{
    text-align:left;
    font-family:SimSun;
    font-size:40px;
    font-weight:900;
    padding-left:12%;
    padding-top:30px;
  }
  
  .check-content{
    font-size:16px;
    padding-top:20px;
    padding-bottom:20px;
    border-bottom:solid 0.3px #afd898;
    color:grey;
  }
  
  #check-text{
    font-size:16px;
    font-weight:500;
  }

  #checked-text{
    text-align:left;
    color:#e5415c;
    padding-left:15px;
  }

  .tabs{
    padding-left:5%;
    padding-right:5%;
  }
</style>