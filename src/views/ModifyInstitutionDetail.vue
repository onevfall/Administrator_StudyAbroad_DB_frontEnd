<template>
  <div class="search-result">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>机构信息详情</span>
        </div>
        <!-- <el-button class="return_button" text>返回</el-button> -->
      </template>

      <el-row style="margin-bottom: 10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构名称：
        </el-col>
        <el-col :span="col3" style="text-align: left">
          {{ this.name }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['name'] = true;
              modified.name = this.name;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构名称"
            v-model="infoName['name']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的名称">
                <el-input v-model="modified.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('name', false);
                  modified.name = '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('name', true);
                  this.name = modified.name;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构联系方式：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.phone }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['phone'] = true;
              modified.phone = this.phone;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构联系方式"
            v-model="infoName['phone']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的联系方式">
                <el-input v-model="modified.phone" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('phone', false);
                  modified.phone = '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('phone', true);
                  this.phone = modified.phone;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构简介：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.introduction }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['introduction'] = true;
              modified.introduction = this.introduction;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构简介"
            v-model="infoName['introduction']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的机构简介">
                <el-input v-model="modified.introduction" autocomplete="off" autosize type="textarea"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('introduction', false);
                  modified.introduction = '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('introduction', true);
                  this.introduction = modified.introduction;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom:10px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left;font-weight: bold"> 机构标识： </el-col>
        <el-col :span="col3" style="text-align: left">
          <div>
            <el-avatar shape="circle" :src="this.profile" size="large"></el-avatar>
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构所在城市：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.city }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['city'] = true;
              modified.city = this.city;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构所在城市"
            v-model="infoName['city']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的机构所在城市">
                <el-input v-model="modified.city" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('city', false);
                  modified.city = '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('city', true);
                  this.city = modified.city;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构所在具体位置：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.location }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['location'] = true;
              modified.location = this.location;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构所在具体位置"
            v-model="infoName['location']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的机构所在具体位置">
                <el-input v-model="modified.location" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('location', false);
                  modified.location= '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('location', true);
                  this.location = modified.location;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构邮箱：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.email }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['email'] = true;
              modified.email = this.email;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构邮箱"
            v-model="infoName['email']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的机构邮箱">
                <el-input v-model="modified.email" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('email', false);
                  modified.email= '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('email', true);
                  this.email = modified.email;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构课程介绍：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.lessons_characteristic }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['lessons_characteristic'] = true;
              modified.lessons_characteristic = this.lessons_characteristic;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构课程介绍"
            v-model="infoName['lessons_characteristic']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的机构课程介绍">
                <el-input v-model="modified.lessons_characteristic" autosize type="textarea" autocomplete="off" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('lessons_characteristic', false);
                  modified.lessons_characteristic= '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('lessons_characteristic', true);
                  this.lessons_characteristic = modified.lessons_characteristic;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构开设课程：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.lessons }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['lesson'] = true;
              modified.lessons = this.lessons;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构课程"
            v-model="infoName['lessons']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的机构课程介绍">
                <el-input v-model="modified.lessons" autosize type="textarea" autocomplete="off" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('lessons', false);
                  modified.lessons= '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('lessons', true);
                  this.lessons = modified.lessons;
                "
                >确 定</el-button
              >
            </div>
          </el-dialog>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 20px">
        <el-col :span="col1"></el-col>
        <el-col :span="col2" style="text-align: left; font-weight: bold">
          机构针对院校所处国家：
        </el-col>
        <el-col :span="col3" style="text-align: left;margin-top: 3px;">
          {{ this.target }}
        </el-col>
        <el-col :span="col4">
          <el-button
            text="primary"
            type="primary"
            @click="
              infoName['target'] = true;
              modified.target = this.target;
            "
            >修改</el-button
          >
          <el-dialog
            title="修改机构针对国家"
            v-model="infoName['target']"
            class="change_dialog"
          >
            <el-form :model="form">
              <el-form-item label="新的机构针对国家">
                <el-input v-model="modified.target" autosize type="textarea" autocomplete="off" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="modify-name-footer">
              <el-button
                @click="
                  updateInstitutionInfo('target', false);
                  modified.target= '';
                "
                >取 消</el-button
              >
              <el-button
                type="primary"
                @click="
                  updateInstitutionInfo('target', true);
                  this.target = modified.target;
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
  name: "modify_institution_detail",
  data() {
    return {
      institution_info: "",
      name: "",
      phone: "",
      introduction: "",
      profile: "",
      city: "",
      location: "",
      email: "",
      lessons_characteristic: "",
      lessons: "",
      target: "",

      col1: 3,
      col2: 4,
      col3: 10,
      col4: 5,

      test: true,

      infoName: {
        name: false,
        phone: false,
        introduction: false,
        profile: false,
        city: false,
        location: false,
        email: false,
        lessons_characteristic: false,
        lessons: false,
        target: false,
      },

      modified: {
        name: "",
        phone: "",
        introduction: "",
        profile: "",
        city: "",
        location: "",
        email: "",
        lessons_characteristic: "",
        lessons: "",
        target: "",
      },
    };
  },
  created() {
    axios
      .get("college/institution", {
        params: {
          institution_id: this.$route.query.institution_id,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.institution_info = res.data.data;
        this.name = this.institution_info.institution_name;
        this.phone = this.institution_info.institution_phone;
        this.introduction = this.institution_info.institution_introduction;
        this.profile = this.institution_info.institution_profile;
        this.city = this.institution_info.institution_city;
        this.location = this.institution_info.institution_location;
        this.email = this.institution_info.institution_email;
        this.lessons_characteristic =
          this.institution_info.institution_lessons_characteristic;
        this.lessons = this.institution_info.institution_lessons;
        this.target = this.institution_info.institution_target;
        //   console.log(this.institution_info.institution_name)

        //   this.QS_rank = this.university_info.rank[this.university_info.rank.length-1].UniversityQsRank
        //   this.THE_rank = this.university_info.rank[this.university_info.rank.length-1].UniversityTheRank
        //   this.US_rank = this.university_info.rank[this.university_info.rank.length-1].UniversityUsnewsRank
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    updateInstitutionInfo: function (key, value) {
      this.infoName[key] = false;
      if (value) {
        var formData = new FormData();
        formData.append("id", this.institution_info.institution_id);
        formData.append(key, this.modified[key]);
        axios
          .post("college/institution/change", formData)
          .then((res) => {
            console.log(res);
            // 修改成功or失败
            var response = res.data;
            if (response.status) {
              ElMessage.success("修改成功！");
            } else {
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
  