<!--
描述：审核卡片
作者：王若晗
-->
<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>审核{{ this.essence }}</span>
      </div>
    </template>
    <el-scrollbar height="370px">
      <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
        <el-tab-pane label="未审核" name="first">
          <div class="check-content">
            <el-row>
              <el-col :span="12" style="text-align:left;padding-left:18%">{{ this.essence }}</el-col>
              <el-col :span="8" style="padding-right:4%">用户</el-col>
              <el-col :span="4" >操作</el-col>
            </el-row>
          </div>
          <div class="check-content" v-for="i in this.tocheck_info" :key="i">
            <el-row>
              <el-col :span="12" style="text-align:left">
                <div style="font-size:20px;color:black">{{ i.PostTitle }}</div>
                <div style="margin-top:10px">{{ i.PostDate }}</div>
              </el-col>
              <el-col :span="8" style="text-align:left;padding-top:1%;padding-left:2%">
                <div style="display:inline-block;vertical-align:middle">
                  <el-avatar shape="circle" :size="50" :src=" i.UserProfile "/>
                </div>
                <div style="display:inline-block;padding-left:5px;color:black">{{ i.UserName }}</div>
              </el-col>
              <el-col :span="4" style="color:#2297FA;padding-top:2%" >
                <el-button type="primary" @click="goCheck(i.PostId)" id="check-text" style="width:100px">
                  <el-icon><Edit /></el-icon>去处理
                </el-button>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已审核" name="second">
          <div class="check-content">
            <el-row>
              <el-col :span="10" style="text-align:left;padding-left:18%">{{ this.essence }}</el-col>
              <el-col :span="6">用户</el-col>
              <el-col :span="4" >审核结果</el-col>
              <el-col :span="4" style="padding-left:2%" >审核批注</el-col>
            </el-row>
          </div>
          <div class="check-content" v-for="i in this.checked_info" :key="i">
            <el-row>
              <el-col :span="10" style="text-align:left">
                <div style="font-size:20px;color:black">{{ i.PostTitle }}</div>
                <div style="margin-top:10px">{{ i.PostSupplement }}</div>
              </el-col>
              <el-col :span="6" style="text-align:left;">
                <div style="display:inline-block;vertical-align:middle">
                  <el-avatar shape="circle" :size="40" :src="i.UserProfile"/>
                </div>
                <div style="display:inline-block;padding-left:5px;color:black">{{ i.UserName }}</div>
              </el-col>
              <el-col :span="4">
                <div v-if="i.ReviewResult=='通过'" style="color:#93CB74;font-size:18px;margin-top:5px;">{{ i.ReviewResult }}</div>
                <div v-if="i.ReviewResult=='不通过'" style="color:#CE2E3E;font-size:18px;margin-top:5px;">{{ i.ReviewResult }}</div>
                <div style="font-size:13px;margin-top:10px">{{ i.ReviewDate }}</div>
              </el-col>
              <el-col :span="4" style="margin-top:5px;padding-left:2%">{{ i.ReviewReason }}</el-col>
            </el-row>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-scrollbar>
  </el-card>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: ["tocheck_info","checked_info","essence"],
  data() {
    return {
      activeName:"first",
    };
  },
  methods:{
    goCheck:function(post_id){
      if(this.essence=="提问")
      {
          this.$router.push({
          name:"question_check",
          query: { question_id: post_id }
        });
      }
      else if(this.essence=="动态")
      {
        this.$router.push({
          name:"blog_check",
          query: { blog_id: post_id }
        });
      }
      else if(this.essence=="回答")
      {
          this.$router.push({
          name:"answer_check",
          query: { answer_id: post_id }
        });
      }
      else if(this.essence=="学历")
      {
          this.$router.push({
          name:"qualification_check",
          query: { qualification_id: post_id }
        });
      }
    },
  }
}
</script>

<style scoped>
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