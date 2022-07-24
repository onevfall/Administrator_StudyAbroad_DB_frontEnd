<!--
描述：动态审核中心
作者：王若晗
-->

<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>审核动态</span>
          </div>
        </template>
        <el-scrollbar height="370px">
          <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
            <el-tab-pane label="未审核" name="first">
              <div class="check-content">
                <el-row>
                  <el-col :span="12" style="text-align:left;padding-left:18%">动态</el-col>
                  <el-col :span="8" >动态用户</el-col>
                  <el-col :span="4" >操作</el-col>
                </el-row>
              </div>
              <div class="check-content" v-for="bl in this.blog_tocheck_info" :key="bl">
                <el-row>
                  <el-col :span="12" style="text-align:left">
                    <div style="font-size:20px;color:black">{{ bl.BlogSummary }}</div>
                    <div style="margin-top:10px">{{ bl.BlogDate }}</div>
                  </el-col>
                  <el-col :span="8" style="padding-top:1%">
                    <div style="display:inline-block;vertical-align:middle">
                      <el-avatar shape="circle" :size="50" :src=" bl.UserProfile "/>
                    </div>
                    <div style="display:inline-block;padding-left:5px;color:black">{{ bl.UserName }}</div>
                  </el-col>
                  <el-col :span="4" style="color:#2297FA;padding-top:2%" >
                    <el-button type="primary" @click="goCheck( bl.BlogId )" id="check-text" style="width:100px">
                      <el-icon><Edit /></el-icon>去处理
                    </el-button>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已审核" name="second">
              <div class="check-content">
                <el-row>
                  <el-col :span="10" style="text-align:left;padding-left:18%">动态</el-col>
                  <el-col :span="6" style="padding-left:2%">动态用户</el-col>
                  <el-col :span="4" >审核结果</el-col>
                  <el-col :span="4" style="padding-left:2%" >审核批注</el-col>
                </el-row>
              </div>
              <div class="check-content" v-for="bl in this.blog_checked_info" :key="bl">
                <el-row>
                  <el-col :span="10" style="text-align:left">
                    <div style="font-size:20px;color:black">{{bl.BlogSummary}}</div>
                  </el-col>
                  <el-col :span="6">
                    <div style="display:inline-block;vertical-align:middle">
                      <el-avatar shape="circle" :size="40" :src="bl.UserProfile"/>
                    </div>
                    <div style="display:inline-block;padding-left:5px;color:black">{{ bl.UserName }}</div>
                  </el-col>                  <el-col :span="4">
                    <div v-if="bl.ReviewResult=='通过'" style="color:#93CB74;font-size:18px;margin-top:5px;">{{ bl.ReviewResult }}</div>
                    <div v-if="bl.ReviewResult=='不通过'" style="color:#CE2E3E;font-size:18px;margin-top:5px;">{{ bl.ReviewResult }}</div>
                    <div style="font-size:13px;margin-top:10px">{{ bl.ReviewDate }}</div>
                  </el-col>
                  <el-col :span="4" style="margin-top:5px;padding-left:2%">{{ bl.ReviewReason }}</el-col>
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
  name: "BlogCheckCenter",
  data() {
    return {
      admin_id:99,
      blog_tocheck_info:[],
      blog_checked_info:[],
      activeName:"first",
    };
  },
  methods:{
    goCheck:function(bl_id){
      this.$router.push({
        name:"blog_check",
        query: { blog_id: bl_id }
      });
    }
  },
  created(){
    axios({
      url: "check/all_blogs",
      method: "get",
      params: {
        admin_id:this.admin_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        for(var i=0;i<res.data.data.blog_list.length;i++)
        {
          res.data.data.blog_list[i].BlogDate=res.data.data.blog_list[i].BlogDate.replace("T"," ");
          if(res.data.data.blog_list[i].ReviewDate==null)
            this.blog_tocheck_info.push(res.data.data.blog_list[i]);
          else
          {
            res.data.data.blog_list[i].ReviewDate=res.data.data.blog_list[i].ReviewDate.replace("T"," ");
            this.blog_checked_info.push(res.data.data.blog_list[i]);
          }
        }
        console.log(blog_tocheck_info);
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