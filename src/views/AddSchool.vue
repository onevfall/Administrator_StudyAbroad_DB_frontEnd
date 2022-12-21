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
          <el-row style="margin-top: 20px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校中文名称：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_chname"
                placeholder="请输入高校名称"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校英文名称：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_enname"
                placeholder="请输入高校名称"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校校徽：</el-col>
            <el-col :span="10" style="text-align: left">
              <el-upload
                ref="upload"
                accept="image/jpeg,image/png"
                :on-change="onUploadChange"
                :auto-upload="false"
                limit="1"
                action="#"
              >
                <template #trigger>
                  <el-button text="primary" type="primary">选择图片</el-button>
                </template>
                
              </el-upload>
            </el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校简称：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_abbreviation"
                placeholder="请输入高校简称"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校简介：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_introduction"
                placeholder="请输入高校简称"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校所在国家：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_country"
                placeholder="请输入高校所在国家"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校所在地区：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_region"
                placeholder="请输入高校所在地区"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校详细地址：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_location"
                placeholder="请输入高校详细地址"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校QS排名：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_qs_rank"
                placeholder="请输入高校QS排名"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校The排名：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_the_rank"
                placeholder="请输入高校The排名"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校Usnews排名：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_usnews_rank"
                placeholder="请输入高校Usnews排名"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校联系方式：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_email"
                placeholder="请输入高校邮箱"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校官网：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_website"
                placeholder="请输入高校官网"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校学生人数：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_student_num"
                placeholder="请输入高校学生人数"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校教师人数：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_teacher_num"
                placeholder="请输入高校教师人数"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div>
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" class="card-content">高校院系：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_college"
                autosize
                type="textarea"
                placeholder="请输入高校院系"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">高校学费：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="university_tuition"
                placeholder="请输入高校学费"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="12"></el-col>
            <el-col :span="4" style="text-align: left">
              <el-button
                type="primary"
                @click="submit_university_info"
                style="
                  font-size: 20px;
                  width: 80px;
                  font-family: SimSun;
                  font-weight: 900;
                "
                >提交</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: "AddSchool",
  data() {
    return {
      university_chname: null,
      university_enname: null,
      university_badge: null,
      university_abbreviation: null,
      university_country: null,
      university_region: null,
      university_location: null,
      university_email: null,
      university_website: null,
      university_student_num: 0,
      university_teacher_num: 0,
      university_college: null,
      university_introduction: null,
      university_tuition: null,
      university_qs_rank:null,
      university_the_rank:null,
      university_usnews_rank:null,
      isLoading: false,
    };
  },
  methods: {
    onUploadChange(file) {
      const isIMAGE =
        file.raw.type === "image/jpeg" || file.raw.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 / 2 < 1;
      if (!isIMAGE) {
        this.$message.error("上传文件只能是图片格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传文件大小不能超过 2MB!");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = (e) => {
        this.university_badge = e.target.result;
        console.log(this.university_badge);
      };
    },
    submit_university_info: function () {
      axios.post("college/university", {
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
          qs_rank:this.university_qs_rank,
          the_rank:this.university_the_rank,
          usnews_rank:this.university_usnews_rank
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
            this.$router.replace({name:"manage_school_info"});
          }
          else{
            //若审核失败
            ElMessage.error("添加失败！");
          }
        })
    },
  },
};
</script>

<style>
.el-main {
  padding: 50px 30px 30px 50px;
}
.box-card {
  border-radius: 10px;
}
.card-header {
  text-align: left;
  font-family: SimSun;
  font-size: 40px;
  font-weight: 900;
  padding-left: 3%;
  padding-top: 30px;
}
.card-content {
  font-family: SimSun;
  text-align: left;
  font-size: 20px;
  font-weight: 900;
}
</style>
