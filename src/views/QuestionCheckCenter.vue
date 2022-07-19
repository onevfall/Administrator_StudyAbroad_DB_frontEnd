<!--
描述：问题审核中心
作者：王若晗
-->
<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>审核问题</span>
          </div>
        </template>
        <el-scrollbar height="370px">
          <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
            <el-tab-pane label="已审核" name="first">
              <div class="check-content">
                <el-row>
                  <el-col :span="12" style="text-align:left;padding-left:18%">问题</el-col>
                  <el-col :span="8" >提问用户</el-col>
                  <el-col :span="4" >操作</el-col>
                </el-row>
              </div>
              <div class="check-content" v-for="ques in this.question_tocheck_info" :key="ques">
                <el-row>
                  <el-col :span="12" style="text-align:left">
                    <div style="font-size:20px;color:black">如何看待同济大学22年分数线跳水？</div>
                    <div style="margin-top:10px">{{ ques.QuestionDate }}</div>
                  </el-col>
                  <el-col :span="8" style="padding-top:1%">
                    <div style="display:inline-block;vertical-align:middle">
                      <el-avatar shape="circle" :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    </div>
                    <div style="display:inline-block;padding-left:5px;color:black">黄渡理工</div>
                  </el-col>
                  <el-col :span="4" style="color:#2297FA;padding-top:2%" >
                    <el-button type="primary" @click="goCheck(ques.QuestionId)" id="check-text" style="width:100px">
                      <el-icon><Edit /></el-icon>去处理
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="未审核" name="second">
              <div class="check-content">
                <el-row>
                  <el-col :span="10" style="text-align:left;padding-left:18%">问题</el-col>
                  <el-col :span="6" style="padding-left:2%">提问用户</el-col>
                  <el-col :span="4" >审核结果</el-col>
                  <el-col :span="4" style="padding-left:2%" >审核批注</el-col>
                </el-row>
              </div>
              <div class="check-content" v-for="ques in this.question_checked_info" :key="ques">
                <el-row>
                  <el-col :span="10" style="text-align:left">
                    <div style="font-size:20px;color:black">如何看待同济大学22年分数线跳水？</div>
                    <div style="margin-top:10px">有没有可能是因为大家都不想吃猪肉捏</div>
                  </el-col>
                  <el-col :span="6">
                    <div style="display:inline-block;vertical-align:middle">
                      <el-avatar shape="circle" :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    </div>
                    <div style="display:inline-block;padding-left:5px;color:black">黄渡理工</div>
                  </el-col>
                  <el-col :span="4">
                    <div v-if="ques.ReviewResult=='通过'" style="color:#93CB74;font-size:18px;margin-top:5px;">{{ ques.ReviewResult }}</div>
                    <div v-if="ques.ReviewResult=='不通过'" style="color:#CE2E3E;font-size:18px;margin-top:5px;">{{ ques.ReviewResult }}</div>
                    <div style="font-size:13px;margin-top:10px">{{ ques.ReviewDate }}</div>
                  </el-col>
                  <el-col :span="4" style="margin-top:5px;padding-left:2%">{{ ques.ReviewReason }}</el-col>
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
export default ({
  name: "QuestionCheckCenter",
  data() {
    return {
      admin_id:99,
      question_tocheck_info:[],
      question_checked_info:[],
      activeName:"first",
    };
  },
  methods:{
    goCheck:function(ques_id){
      this.$router.push({
        name:"question_check",
        query: { question_id: ques_id }
      });
    }
  },
  created(){
    axios({
      url: "check/all_questions",
      method: "get",
      params: {
        admin_id:this.admin_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        for(var i=0;i<res.data.data.question_list.length;i++)
        {
          res.data.data.question_list[i].QuestionDate=res.data.data.question_list[i].QuestionDate.replace("T"," ");
          if(res.data.data.question_list[i].ReviewDate!=null)
            {
              res.data.data.question_list[i].ReviewDate=res.data.data.question_list[i].ReviewDate.replace("T"," ");
              this.question_checked_info.push(res.data.data.question_list[i]);
            }
          else
            {
              this.question_tocheck_info.push(res.data.data.question_list[i]);
            }
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