<template>
  <el-container>
    <el-main>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>添加机构</span>
          </div>
        </template>
        <div class="card-content">
          <el-row style="margin-top: 20px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">机构名称：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_name"
                placeholder="请输入机构名称"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">机构联系方式：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_phone"
                placeholder="请输入机构联系方式"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">机构简介：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_instroduction"
                placeholder="请输入机构简介"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">机构标识：</el-col>
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
            <el-col :span="5" style="text-align: left">机构资质：</el-col>
            <el-col :span="10" style="text-align: left">
              <el-upload
                ref="upload"
                accept="image/jpeg,image/png"
                :on-change="onUploadChangeQualification"
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
            <el-col :span="5" style="text-align: left">机构所在城市：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_city"
                placeholder="请输入机构所在城市"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">机构详细地址：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_location"
                placeholder="请输入机构详细地址"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div>
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" class="card-content">机构邮箱：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_email"
                placeholder="请输入机构邮箱"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">开设课程：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_lessons"
                placeholder="请输入开设课程"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div>
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" class="card-content">机构课程介绍：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="institution_lessons_characteristic"
                autosize
                type="textarea"
                placeholder="请输入课程介绍"
                clearable
            /></el-col>
          </el-row>
        </div>
        <div class="card-content">
          <el-row style="margin-top: 50px">
            <el-col :span="3"></el-col>
            <el-col :span="5" style="text-align: left">机构针对院校所处国家：</el-col>
            <el-col :span="10" style="text-align: left"
              ><el-input
                v-model="target_country"
                placeholder="请输入机构针对院校所处国家"
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
      institution_name: null,
      institution_phone: null,
      institution_qualify: null,
      institution_instroduction: null,
      institution_profile: null,
      institution_city: null,
      institution_location: null,
      institution_email: null,
      institution_lessons_characteristic: null,
      institution_lessons: null,
      target_country: null,
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
        this.institution_profile = e.target.result;
      };
    },
    onUploadChangeQualification(file) {
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
        this.institution_qualify = e.target.result;
      };
    },

    submit_university_info: function () {
      axios
        .post("institution", {
            institution_name: this.institution_name,
            institution_phone: this.institution_phone,
            institution_qualify: this.institution_qualify,
            institution_instroduction: this.institution_instroduction,
            institution_profile: this.institution_profile,
            institution_city: this.institution_city,
            institution_location: this.institution_location,
            institution_email: this.institution_email,
            institution_lessons_characteristic: this.institution_lessons_characteristic,
            institution_lessons: this.institution_lessons,
            target_country: this.target_country,
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
            this.$router.replace({ name: "institution_manage_center" });
          } else {
            //若审核失败
            ElMessage.error("添加失败！");
          }
        });
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
