<!--
描述：回答审核中心
作者：王若晗
-->

<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>审核回答</span>
          </div>
        </template>
        <el-scrollbar height="370px">
          <el-row style="padding-top:30px;margin:0 5% 20px 5%">
            <el-col :span="4"></el-col>
            <el-col :span="6" id="order">按时间倒序</el-col>
          </el-row>
          <div class="check-content">
            <el-row>
              <el-col :span="4"></el-col>
              <el-col :span="3" style="text-align:left">回答ID</el-col>
              <el-col :span="3" style="text-align:left">用户ID</el-col>
              <el-col :span="8" style="text-align:left">回答时间</el-col>
            </el-row>
          </div>
          <div class="check-content" v-for="ans in this.answer_tocheck_info" :key="ans">
            <el-row>
              <el-col :span="4"></el-col>
              <el-col :span="3" style="text-align:left">{{ ans.AnswerId }}</el-col>
              <el-col :span="3" style="text-align:left">{{ ans.AnswerUserId }}</el-col>
              <el-col :span="10" style="text-align:left">{{ ans.AnswerDate }}</el-col>
              <el-col :span="4" style="text-align:left;color:#2297FA" >
                <el-button text="primary" type="primary" @click="goCheck(ans.AnswerId)" id="check-text">
                  去处理
                </el-button>
              </el-col>
            </el-row>
          </div>
          <div class="check-content">
            <el-row style="margin-top:30px">
              <el-col :span="4"></el-col>
              <el-col :span="3" style="text-align:left">回答ID</el-col>
              <el-col :span="3" style="text-align:left">是否通过</el-col>
              <el-col :span="5" style="text-align:left">审核时间</el-col>
              <el-col :span="5" style="text-align:left">审核批注</el-col>
            </el-row>
          </div>
          <div class="check-content" v-for="ans in this.answer_checked_info" :key="ans">
            <el-row>
              <el-col :span="4"></el-col>
              <el-col :span="3" style="text-align:left">{{ ans.AnswerId }}</el-col>
              <el-col :span="3" style="text-align:left">{{ ans.ReviewResult }}</el-col>
              <el-col :span="5" style="text-align:left">{{ ans.ReviewDate }}</el-col>
              <el-col :span="5" style="text-align:left">{{ ans.ReviewReason }}</el-col>
              <el-col :span="4" id="checked-text">已处理</el-col>
            </el-row>
          </div>
        </el-scrollbar>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
export default ({
  name: "AnswerCheckCenter",
  data() {
    return {
      admin_id:99,
      answer_tocheck_info:[],
      answer_checked_info:[],
    };
  },
  methods:{
    goCheck:function(ans_id){
      this.$router.push({
        name:"answer_check",
        query: { answer_id: ans_id }
      });
    }
  },
  created(){
    axios({
      url: "check/all_answers",
      method: "get",
      params: {
        admin_id:this.admin_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        for(var i=0;i<res.data.data.answer_list.length;i++)
        {
          if(res.data.data.answer_list[i].ReviewDate==null)
            this.answer_tocheck_info.push(res.data.data.answer_list[i]);
          else
            this.answer_checked_info.push(res.data.data.answer_list[i]);
        }
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
    padding-left:15%;
    padding-top:30px;
  }

  #order{
    font-family:SimSun;
    font-size:19px;
    color:#2297FA;
    font-weight:bolder;
    text-align:left;
  }
  
  .check-content{
    font-family:SimSun;
    font-size:19px;
    padding-top:20px;
    padding-bottom:20px;
    font-weight:bolder;
    border-bottom:solid 0.8px black;
    margin-left:5%;
    margin-right:5%;
  }
  
  #check-text{
    font-family:SimSun;
    font-size:19px;
    font-weight:900;
  }

  #checked-text{
    text-align:left;
    color:#e5415c;
    padding-left:15px;
  }
</style>