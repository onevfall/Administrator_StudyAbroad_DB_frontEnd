<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>审核动态</span>
          </div>
        </template>
        <div class="card-content">
          <el-row style="margin-top:20px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">动态ID：</el-col>
            <el-col :span="4" style="text-align:left">{{ blog_info.BlogId }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">用户名称：</el-col>
            <el-col :span="10" style="text-align:left">{{ blog_info.BlogUserName }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">动态标签：</el-col>
            <el-col :span="10" style="text-align:left">{{ blog_info.BlogTag }}</el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">动态内容：</el-col>
            <el-col :span="10" style="text-align:left"><p v-html="blog_info.BlogContent"></p></el-col>
          </el-row>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="4" style="text-align:left">动态时间：</el-col>
            <el-col :span="10" style="text-align:left">{{ blog_info.BlogDate }}</el-col>
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
  name: "BlogCheck",
  data() {
    return {
        ReviewResult:null,
        ReviewReason:null,
        blog_id:2,
        blog_info:[],
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
        axios.post("check/submit_blog", {
          blog_id:this.blog_id,
          administrator_id:this.administrator_id,
          review_result:this.ReviewResult,
          review_reason:this.ReviewReason,
        })
        .then((res) => {
          console.log(res);
          var response = res.data;
          console.log(response.status);
          console.log(this.blog_info);
          if (response.status == true) {
            //若审核成功
            ElMessage({
              message: "ID为"+this.blog_id+ "的动态审核成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            this.$router.replace({name:"blog_check_center"});
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
    this.blog_id=this.$route.query.blog_id;
    axios({
      url: "check/single_blog",
      method: "get",
      params: {
        blog_id:this.blog_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        this.blog_info=res.data.data;
        this.blog_info.BlogDate=this.blog_info.BlogDate.replace("T"," ");
        const xhrFile = new XMLHttpRequest();
        xhrFile.open("GET", this.blog_info.BlogContent, true);
        xhrFile.send();
        xhrFile.onload = () => {
        this.blog_info.BlogContent = xhrFile.response;}
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