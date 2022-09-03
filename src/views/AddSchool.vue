<template>
  <el-container>
    <el-main>
        <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>添加高校</span>
          </div>
        </template>
        <div class="card-content">
          <el-row style="margin-top:20px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校中文名称：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_chname" placeholder="请输入高校名称" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校英文名称：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_enname" placeholder="请输入高校名称" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校校徽：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_badge" placeholder="请输入高校校徽相对地址" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校简称：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_abbreviation" placeholder="请输入高校简称" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校简介：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_introduction" placeholder="请输入高校简称" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校所在国家：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_country" placeholder="请输入高校所在国家" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校所在地区：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_region" placeholder="请输入高校所在地区" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校详细地址：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_location" placeholder="请输入高校详细地址" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校联系方式：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_email" placeholder="请输入高校邮箱" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校官网：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_website" placeholder="请输入高校官网" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校学生人数：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_student_num" placeholder="请输入高校学生人数" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校教师人数：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_teacher_num" placeholder="请输入高校教师人数" clearable/></el-col>
          </el-row>
        </div>
        <div>
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" class="card-content">高校院系：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_college" 
                                                                 autosize type="textarea"
                                                                 placeholder="请输入高校院系" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align:left">高校学费：</el-col>
            <el-col :span="10" style="text-align:left"><el-input v-model="university_tuition" placeholder="请输入高校学费" clearable/></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top:50px">
            <el-col :span="12"></el-col>
            <el-col :span="4" style="text-align:left">
              <el-button type="primary" @click="submit_university_info" style="font-size:20px;width:80px;font-family:SimSun;font-weight:900">提交</el-button>
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
  name: "AddSchool",
  data() {
    return {
        university_chname:null,
        university_enname:null,
        university_badge:null,
        university_abbreviation:null,
        university_country:null,
        university_region:null,
        university_location:null,
        university_email:null,
        university_website:null,
        university_student_num:0,
        university_teacher_num:0,
        university_college:null,
        university_QS_rank:null,
        university_THE_rank:null,
        university_USNEWS_rank:null,
        university_introduction:null,
        university_tuition:null,
        isLoading:false,
    };
  },
  methods:{
    submit_university_info:function(){
        /*axios.post("university", {
          university_email:this.university_email,
          university_chname:this.university_chname,
          university_enname:this.university_enname,
          university_badge:this.university_badge,
          university_region:this.university_region,
          university_country:this.university_country,
          university_location:this.university_location,
          university_introduction:this.university_introduction,
          university_student_num:this.university_student_num,
          university_website:this.university_website,
          university_college:this.university_college,
          university_abbreviation:this.university_abbreviation,
          university_teacher_num:this.university_teacher_num,
          university_tuition:this.university_tuition,
        })
        .then((res) => {
          console.log(res);
          var response = res.data;
          console.log(response.status);
          if (response.status == true) {
            //若审核成功
            ElMessage({
              message: "添加成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            //this.$router.replace({name:"answer_check_center"});
          }
          else{
            //若审核失败
            ElMessage.error("添加失败！");
          }
        })*/
        axios.post("university", {
          university_email:"1",
          university_chname:"1",
          university_enname:"1",
          university_badge:"1",
          university_region:"1",
          university_country:"1",
          university_location:"1",
          university_introduction:"1",
          university_student_num:1,
          university_website:"1",
          university_college:"1",
          university_abbreviation:"1",
          university_teacher_num:1,
          university_tuition:"1",
        }) 
        .then((res) => {
          var response = res.data;
          console.log(response);
          //console.log(response.status);
          if (response.status == true) {
            //若审核成功
            ElMessage({
              message: "添加成功！",
              type: "success",
              showClose: true,
              duration: 2000,
            });
            //this.$router.replace({name:"answer_check_center"});
          }
          else{
            //若审核失败
            ElMessage.error("审核失败！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
})
</script>

<style>
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
    padding-left:3%;
    padding-top:30px;
  }
  .card-content{
    font-family:SimSun;
    text-align:left;
    font-size:20px;
    font-weight:900;
  }
</style>