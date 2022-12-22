<template>
  <div class="search-result">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>高校信息详情</span>
        </div>
        <!-- <el-button class="return_button" text>返回</el-button> -->
      </template>
      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          高校名称：
        </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityChName }}（{{
            this.university_info.universityEnName
          }}）
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['name'] = true;
              modified.chname = this.university_info.universityChName;
              modified.enname = this.university_info.universityEnName;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改高校名称"
            v-model="infoName['name']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="中文名">
                <el-input
                  v-model="modified.chname"
                  autocomplete="off"
                  :placeholder="this.university_info.universityChName"
                ></el-input>
              </el-form-item>
              <el-form-item label="英文名">
                <el-input
                  v-model="modified.enname"
                  autocomplete="off"
                  :placeholder="this.university_info.universityEnName"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityName(false)">取 消</el-button>
              <el-button type="primary" @click="updateUniversityName(true)"
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold"> 高校校徽： </el-col>
        <el-col :span="col3" style="text-align: left">
          <div>
            <el-avatar shape="circle" :src="this.university_info.universityBadge"></el-avatar>
          </div>
        </el-col>
        <el-col :span="col4">
          <!-- <el-button text="primary" type="primary" @click="infoName['badge']=true">修改</el-button>
              <el-dialog title="高校校徽" v-model="infoName['badge']">
                <el-form :model="form">
                  <el-form-item label="新的校徽">
                    <el-input v-model="modified.badge" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('badge',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('badge',true)">确 定</el-button>
                </div>
              </el-dialog> -->
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校简称： </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 2px;">
          {{ this.university_info.universityAbbreviation }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['abbreviation'] = true;              
            modified.abbreviation = this.university_info.universityAbbreviation;"
            >修改</el-button
          >
          <el-dialog title="高校简称" v-model="infoName['abbreviation']">
            <el-form :model="form">
              <el-form-item label="新的简称">
                <el-input
                  v-model="modified.abbreviation"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('abbreviation', false); modified.abbreviation = '';"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('abbreviation', true);
                  this.university_info.universityAbbreviation = modified.abbreviation;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校所在国家： </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityCountry }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['country'] = true;
            modified.country = this.university_info.universityCountry"
            >修改</el-button
          >
          <el-dialog title="高校所在国家" v-model="infoName['country']">
            <el-form :model="form">
              <el-form-item label="所在国家">
                <el-input
                  v-model="modified.country"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('country', false); modified.country='';"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('country', true);
                  this.university_info.universityCountry = modified.country;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校所在地区： </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityRegion }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['region'] = true;modified.region=this.university_info.universityRegion;"
            >修改</el-button
          >
          <el-dialog title="高校所在地区" v-model="infoName['region']">
            <el-form :model="form">
              <el-form-item label="所在国家">
                <el-input
                  v-model="modified.region"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('region', false);modified.region=''"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('region', true);
                  this.university_info.universityRegion = modified.region;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校详细地址： </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityLocation }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['location'] = true;modified.location=this.university_info.universityLocation;"
            >修改</el-button
          >
          <el-dialog title="高校详细地址" v-model="infoName['location']">
            <el-form :model="form">
              <el-form-item label="所在国家">
                <el-input
                  v-model="modified.location"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('location', false);modified.location='';"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('location', true);
                  this.university_info.universityLocation = modified.location;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px;">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight:bold;"> 高校邮箱： </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityEmail }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['email'] = true;modified.email=this.university_info.universityEmail"
            >修改</el-button
          >
          <el-dialog title="高校邮箱" v-model="infoName['email']">
            <el-form :model="form">
              <el-form-item label="新的邮箱">
                <el-input
                  v-model="modified.email"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('email', false);modified.email=''"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('email', true);
                  this.university_info.universityEmail = modified.email;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校官网： </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityWebsite }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['website'] = true;modified.website=this.university_info.universityWebsite "
            >修改</el-button
          >
          <el-dialog title="高校官网" v-model="infoName['website']">
            <el-form :model="form">
              <el-form-item label="新的官网">
                <el-input
                  v-model="modified.website"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('website', false);modified.website='';"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('website', true);
                  this.university_info.universityWebsite = modified.website;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校学生人数： </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityStudentNum }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['student_num'] = true;modified.student_num = this.university_info.universityStudentNum"
            >修改</el-button
          >
          <el-dialog title="高校学生人数" v-model="infoName['student_num']">
            <el-form :model="form">
              <el-form-item label="新的人数">
                <el-input
                  v-model="modified.student_num"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('student_num', false);modified.student_num=0;"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('student_num', true);
                  this.university_info.university_student_num = modified.student_num;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校教师人数： </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.university_info.universityTeacherNum }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['teacher_num'] = true;modified.teacher_num = this.university_info.universityTeacherNum"
            >修改</el-button
          >
          <el-dialog title="高校教师人数" v-model="infoName['teacher_num']">
            <el-form :model="form">
              <el-form-item label="新的人数">
                <el-input
                  v-model="modified.teacher_num"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('teacher_num', false);modified.teacher_num = 0"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('teacher_num', true);
                  this.university_info.university_teacher_num = modified.teacher_num;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校院系： </el-col>
        <el-col :span="col3" style="text-align: left">
          <div v-for="college in this.university_info.universityCollege" style="margin-top:5px;">
            {{ college }}
          </div>
        </el-col>
        <el-col :span="col4">
          <!-- <el-button text="primary" type="primary" @click="infoName['teacher_num']=true">修改</el-button> -->
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight:bold"> 高校QS排名： </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 2px;">
          {{ this.QS_rank }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['qs_rank'] = true;modified.qs_rank = this.QS_rank"
            >修改</el-button
          >
          <el-dialog title="高校QS排名" v-model="infoName['qs_rank']">
            <el-form :model="form">
              <el-form-item label="新的排名">
                <el-input
                  v-model="modified.qs_rank"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('qs_rank', false);modified.qs_rank = 0"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('qs_rank', true);
                  this.QS_rank = modified.qs_rank;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;"> 高校THE排名： </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 2px;">
          {{ this.THE_rank }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['the_rank'] = true; modified.the_rank = this.THE_rank   "
            >修改</el-button
          >
          <el-dialog title="高校THE排名" v-model="infoName['the_rank']">
            <el-form :model="form">
              <el-form-item label="新的排名">
                <el-input
                  v-model="modified.the_rank"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('the_rank', false);modified.the_rank = 0"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('the_rank', true);
                  this.THE_rank = modified.the_rank;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 10px;">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;">
          高校USNEWS排名：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 2px;">
          {{ this.US_rank }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['usnews_rank'] = true;modified.usnews_rank = this.US_rank"
            >修改</el-button
          >
          <el-dialog title="高校USNEWS排名" v-model="infoName['usnews_rank']">
            <el-form :model="form">
              <el-form-item label="新的排名">
                <el-input
                  v-model="modified.usnews_rank"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('usnews_rank', false);modified.usnews_rank = 0"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('usnews_rank', true);
                  this.US_rank = modified.usnews_rank;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 10px;">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;">
          雅思成绩要求：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 4px;">
          {{ this.university_info.universityIeltsRequirement}}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['ielts_requirement'] = true; modified.ielts_requirement = this.university_info.universityIeltsRequirement"
            >修改</el-button
          >
          <el-dialog title="高校雅思成绩要求" v-model="infoName['ielts_requirement']">
            <el-form :model="form">
              <el-form-item label="新的成绩要求">
                <el-input
                  v-model="modified.ielts_requirement"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('ielts_requirement', false); modified.ielts_requirement = 0"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('ielts_requirement', true);
                  this.university_info.universityIeltsRequirement = modified.ielts_requirement;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 10px;">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;">
          托福成绩要求：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 4px;">
          {{ this.university_info.universityTofelRequirement}}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['tofel_requirement'] = true; modified.tofel_requirement = this.university_info.universityTofelRequirement"
            >修改</el-button
          >
          <el-dialog title="高校托福成绩要求" v-model="infoName['tofel_requirement']">
            <el-form :model="form">
              <el-form-item label="新的成绩要求">
                <el-input
                  v-model="modified.tofel_requirement"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('tofel_requirement', false); modified.tofel_requirement = 0"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('tofel_requirement', true);
                  this.university_info.university_tofel_requirement = modified.tofel_requirement;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 10px;">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;">
          高校学费：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 4px;">
          {{ this.university_info.universityTuition}}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['tuition'] = true; modified.tuition = this.university_info.universityTuition"
            >修改</el-button
          >
          <el-dialog title="高校学费" v-model="infoName['tuition']">
            <el-form :model="form">
              <el-form-item label="新的学费">
                <el-input
                  v-model="modified.tuition"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('tuition', false); modified.tuition = 0"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('tuition', true);
                  this.university_info.universityTuition = modified.tuition;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 10px;">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold;">
          高校介绍：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 4px;">
          {{ this.university_info.universityIntroduction}}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="infoName['introduction'] = true; modified.introduction = this.university_info.universityIntroduction"
            >修改</el-button
          >
          <el-dialog title="高校介绍" v-model="infoName['introduction']">
            <el-form :model="form">
              <el-form-item label="新的介绍">
                <el-input
                  v-model="modified.introduction"
                  autosize
                  type="textarea"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button @click="updateUniversityInfo('introduction', false); modified.introduction = ''"
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateUniversityInfo('introduction', true);
                  this.university_info.universityIntroduction = modified.introduction;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>
      
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "modify_school_detail",
  data() {
    return {
      university_info: "",
      QS_rank:-1,
      THE_rank:-1,
      US_rank:-1,

      col1: 3,
      col2: 4,
      col3: 10,
      col4: 5,

      test: true,

      infoName: {
        name: false,
        badge: false,
        abbreviation: false,
        country: false,
        region: false,
        location: false,
        email: false,
        website: false,
        student_num: false,
        teacher_num: false,
        qs_rank: false,
        the_rank: false,
        usnews_rank: false,
        ielts_requirement:false,
        tofel_requirement:false,
        tuition:false,
        introduction:false,
      },

      modified: {
        enname: "",
        chname: "",
        badge: "",
        abbreviation: "",
        country: "",
        region: "",
        location: "",
        email: "",
        website: "",
        student_num: 0,
        teacher_num: 0,
        qs_rank: 0,
        the_rank: 0,
        usnews_rank: 0,
        ielts_requirement:0,
        tofel_requirement:0,
        tuition:"",
        introduction:"",
      },
    };
  },
  created() {
    axios
      .get("college/"+this.$route.query.school_id)
      .then((res) => {
        console.log(res.data.obj);
        this.university_info = res.data.obj;
        this.QS_rank = this.university_info.rank[this.university_info.rank.length-1].universityQsRank
        this.THE_rank = this.university_info.rank[this.university_info.rank.length-1].universityTheRank
        this.US_rank = this.university_info.rank[this.university_info.rank.length-1].universityUsnewsRank
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    updateUniversityName: function (value) {
      this.infoName["name"] = false;
      if (value) {
        console.log(this.modified);
        var formData = new FormData();
        formData.append("id", this.university_info.universityId);
        formData.append("chname", this.modified["chname"]);
        formData.append("enname", this.modified["enname"]);
        axios
          .post("college/university/change", formData)
          .then((res) => {
            // 修改成功or失败
            console.log(res.data);
            if (res.data.status) {
              ElMessage.success("修改成功");
              this.university_info.university_chname = this.modified.chname;
              this.university_info.university_enname = this.modified.enname;
            } else {
              ElMessage.error("修改失败");
            }
          })
          .catch((err) => {
            console.log(err);
            ElMessage.error("修改失败");
          });
      } else {
        this.modified["chname"] = "";
        this.modified["enname"] = "";
      }
    },
    updateUniversityInfo: function(key, value) {
      this.infoName[key] = false;
      if (value) {
        var formData = new FormData();
        formData.append("id", this.university_info.university_id);
        formData.append(key, this.modified[key]);
        console.log(this.modified[key]);
        axios.post("college/university/change", formData)
        .then((res) => {
          console.log(res);
          // 修改成功or失败
          var response = res.data;
          if (response.status) {
            ElMessage.success("修改成功！");
          }
          else {
            ElMessage.error("修改失败！请检查合法性");
          }
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("修改失败！请检查合法性");
        });
      }
    },
    updateUniversityInfo_Num: function(key, value) {
      this.infoName[key] = false;
      if (value) {
        var formData = new FormData();
        formData.append("id", this.university_info.university_id);
        formData.append(key, Number(this.modified[key]));
        console.log(key)
        axios.post("college/university/change", formData)
        .then((res) => {
          console.log(res);
          // 修改成功or失败
          var response = res.data;
          if (response.status) {
            ElMessage.success("修改成功！");
          }
          else {
            ElMessage.error("修改失败！请检查合法性");
          }
        })
        .catch((err) => {
          console.log(err);
          ElMessage.error("修改失败！请检查合法性");
        });
      }
    },
  },
};
</script>

<style scoped>
.card-header {
  width: 260px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.return_button {
  display: flex;
  justify-content: right;
  /* align-items: center; */
}
</style>
