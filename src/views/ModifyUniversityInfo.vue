<template>
  <!-- <h1>这里是修改高校信息</h1> -->
  <el-container>
    <el-main>
      <el-card 
        class="box-card" 
        shadow="hover"
        style="height:auto"
        v-loading.fullscreen.lock="isLoading"
        element-loading-text="正在搜索"
      >
        <!-- <template #header> -->
          <div class="card-header">
            查询高校信息
          </div>
        <!-- </template> -->
        <el-row class="search">
          <el-col :span="8"></el-col>
          <el-col :span="5">
            <el-input v-model="search_word" placeholder="请输入高校名称" style="background:#e4e4e4">请输入高校名称</el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" round @click="getUniversityInfo()">查询高校</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
        <div v-if="search_info==-1">
          <div class="call-word">搜索失败！高校不存在</div>
        </div>
        <div v-if="search_info==1" class="search-result">
          <div class="call-word">搜索成功！展示如下</div>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校id：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_id}}
            </el-col>
            <el-col :span="col4"></el-col>
          </el-row>
          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校名称：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_chname}}（{{this.university_enname}}）
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['name']=true">修改</el-button>
              <el-dialog title="修改高校名称" v-model="infoName['name']">
                <el-form :model="form">
                  <el-form-item label="中文名">
                    <el-input v-model="modified.chname" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="英文名">
                    <el-input v-model="modified.enname" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityName(false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityName(true);university_chname=modified.chname;university_enname=modified.enname;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校校徽：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              <div>
                <el-avatar shape="circle" :src="this.university_badge"></el-avatar>
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
          
          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校简称：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_abbreviation}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['abbreviation']=true">修改</el-button>
              <el-dialog title="高校简称" v-model="infoName['abbreviation']">
                <el-form :model="form">
                  <el-form-item label="新的简称">
                    <el-input v-model="modified.abbreviation" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('abbreviation',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('abbreviation',true);university_abbreviation=modified.abbreviation;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校所在国家：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_country}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['country']=true">修改</el-button>
              <el-dialog title="高校所在国家" v-model="infoName['country']">
                <el-form :model="form">
                  <el-form-item label="所在国家">
                    <el-input v-model="modified.country" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('country',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('country',true);university_country=modified.country;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校所在地区：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_region}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['region']=true">修改</el-button>
              <el-dialog title="高校所在地区" v-model="infoName['region']">
                <el-form :model="form">
                  <el-form-item label="所在国家">
                    <el-input v-model="modified.region" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('region',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('region',true);university_region=modified.region;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校详细地址：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_location}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['location']=true">修改</el-button>
              <el-dialog title="高校详细地址" v-model="infoName['location']">
                <el-form :model="form">
                  <el-form-item label="所在国家">
                    <el-input v-model="modified.location" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('location',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('location',true);university_location=modified.location;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校邮箱：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_email}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['email']=true">修改</el-button>
              <el-dialog title="高校邮箱" v-model="infoName['email']">
                <el-form :model="form">
                  <el-form-item label="新的邮箱">
                    <el-input v-model="modified.email" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('email',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('email',true);university_email=modified.email;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校官网：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_website}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['website']=true">修改</el-button>
              <el-dialog title="高校官网" v-model="infoName['website']">
                <el-form :model="form">
                  <el-form-item label="新的官网">
                    <el-input v-model="modified.website" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('website',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('website',true);university_website=modified.website;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校学生人数：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_student_num}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['student_num']=true">修改</el-button>
              <el-dialog title="高校学生人数" v-model="infoName['student_num']">
                <el-form :model="form">
                  <el-form-item label="新的人数">
                    <el-input v-model="modified.student_num" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('student_num',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('student_num',true);university_student_num=modified.student_num;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校教师人数：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.university_teacher_num}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['teacher_num']=true">修改</el-button>
              <el-dialog title="高校教师人数" v-model="infoName['teacher_num']">
                <el-form :model="form">
                  <el-form-item label="新的人数">
                    <el-input v-model="modified.teacher_num" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('teacher_num',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('teacher_num',true);university_teacher_num=modified.teacher_num;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校院系：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              <div v-for="college in university_college">
                {{college}}
              </div>
            </el-col>
            <el-col :span="col4">
              <!-- <el-button text="primary" type="primary" @click="infoName['teacher_num']=true">修改</el-button> -->
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校QS排名：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.QS_rank}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['qs_rank']=true">修改</el-button>
              <el-dialog title="高校QS排名" v-model="infoName['qs_rank']">
                <el-form :model="form">
                  <el-form-item label="新的排名">
                    <el-input v-model="modified.qs_rank" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('qs_rank',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('qs_rank',true);QS_rank=modified.qs_rank;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校THE排名：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.THE_rank}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['the_rank']=true">修改</el-button>
              <el-dialog title="高校THE排名" v-model="infoName['the_rank']">
                <el-form :model="form">
                  <el-form-item label="新的排名">
                    <el-input v-model="modified.the_rank" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('the_rank',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('the_rank',true);THE_rank=modified.the_rank;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="col1"></el-col>
            <el-col :span="col2" style="text-align:left">
              高校USNEWS排名：
            </el-col>
            <el-col :span="col3" style="text-align:left">
              {{this.USNEWS_rank}}
            </el-col>
            <el-col :span="col4">
              <el-button text="primary" type="primary" @click="infoName['usnews_rank']=true">修改</el-button>
              <el-dialog title="高校USNEWS排名" v-model="infoName['usnews_rank']">
                <el-form :model="form">
                  <el-form-item label="新的排名">
                    <el-input v-model="modified.usnews_rank" autocomplete="off"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="modify-name-footer">
                  <el-button @click="updateUniversityInfo('usnews_rank',false)">取 消</el-button>
                  <el-button type="primary" @click="updateUniversityInfo('usnews_rank',true);USNEWS_rank=modified.usnews_rank;">确 定</el-button>
                </div>
              </el-dialog>
            </el-col>
          </el-row>
        </div>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "ModifyUniversityInfo",
  data() {
    return {
      col1: 3,
      col2: 6,
      col3: 10,
      col4: 5,

      test: true,

      infoName: {
        "name": false, 
        "badge": false, 
        "abbreviation": false, 
        "country": false, 
        "region": false,
        "location": false, 
        "email": false, 
        "website": false,
        "student_num": false, 
        "teacher_num": false,
        "qs_rank": false,
        "the_rank": false,
        "usnews_rank": false,
      },

      modified: {
        "enname": "",
        "chname": "",
        "badge": "",
        "abbreviation": "",
        "country": "",
        "region": "",
        "location": "",
        "email": "",
        "website": "",
        "student_num": 0,
        "teacher_num": 0,
        "qs_rank": 0,
        "the_rank": 0,
        "usnews_rank": 0,
      },

      search_info: 0,
      search_word: "",

      university_id: "",
      university_chname: "",
      university_enname: "",
      university_badge: "",
      university_abbreviation: "",
      university_country: "",
      university_region: "",
      university_location: "",
      university_email: "",
      university_website: "",
      university_student_num: 0,
      university_teacher_num: 0,
      university_college: [],
      QS_rank: 0,
      THE_rank: 0,
      USNEWS_rank: 0,
      isLoading:false,
    };
  },
  methods: {
    getUniversityInfo() {
      console.log(this.search_word);
      this.isLoading=true;
      axios.get("university/chname", {
        params: {
          chname: this.search_word,
        }
      })
      .then((res) => {
        console.log("搜索结果")
        console.log(res);
        if(!res.data.status) {
          this.search_info = -1;
          this.isLoading=false;
        }
        else {
          this.search_info = 1;
          var source_data = res.data.data;
          console.log("search_id = " + this.search_info)
          console.log(source_data.university_id);
          axios.get("university/get_rank", {
            params: {
              university_id: res.data.data.university_id,
            }
          })
          .then((res) => {
            console.log(res);
            if(res.data.status) {
              this.QS_rank = res.data.data.rank[0].UniversityQsRank;
              this.THE_rank = res.data.data.rank[0].UniversityTheRank;
              this.USNEWS_rank = res.data.data.rank[0].UniversityUsnewsRank;
              this.university_id = source_data.university_id;
              this.university_chname = source_data.university_chname;
              this.university_enname = source_data.university_enname;
              this.university_badge = source_data.university_badge;
              this.university_abbreviation = source_data.university_abbreviation;
              this.university_country = source_data.university_country;
              this.university_region = source_data.university_region;
              this.university_location = source_data.university_location;
              this.university_email = source_data.university_email;
              this.university_website = source_data.university_website;
              this.university_student_num = source_data.university_student_num;
              this.university_teacher_num = source_data.university_teacher_num;
              // console.log(source_data.university_college);
              this.university_college = source_data.university_college;
            }
          })
          .catch((err) => {
            console.log("test");
            console.log(err);
          })
          this.isLoading=false;
        }
      })
      .catch((err) => {
        console.log(err);
        this.isLoading=false;
        this.$alert('输入有误','警告', {
          confirmButtonText: '确定',
          callback: action => {
            this.search_word = "";
          }
        })
      });
    },
    updateUniversityName: function(value) {
      this.infoName['name'] = false;
      if (value) {
        var formData = new FormData();
        formData.append("id", this.university_id);
        formData.append("chname", this.modified["chname"]);
        formData.append("enname", this.modified["enname"]);
        axios.post("university/change", formData)
        .then((res) => {
          // 修改成功or失败
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      }
    },
    updateUniversityInfo: function(key, value) {
      this.infoName[key] = false;
      if (value) {
        var formData = new FormData();
        formData.append("id", this.university_id);
        formData.append(key, this.modified[key]);
        axios.post("university/change", formData)
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
        });
      }
      
    },
  },
  components: {
    ElMessage,
  },
  created() {
    if (!this.$store.state.is_login) {
      ElMessage({
        message: "请先登录",
        type: "warning",
        showClose: true,
        duration: 2000,
      });
      /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
      this.$router.push({
        path: "/login",
        query: { redirect: this.$route.fullPath },
      });
    }
  },
};
</script>

<style scoped>
  .box-card {
    border-radius:10px;
    height:100%;
  }
  .card-header {
    font-family:SimSun;
    font-size:40px;
    font-weight:900;
    margin-left: 5%;
    margin-right: 70%;
    border-bottom: 6px grey solid;
  }
  .search {
    margin-top: 5%;
  }
  .call-word {
    border-bottom: 1px grey solid;
  }
  .el-row {
    margin-top: 1%;
    margin-bottom: 1%;
  }
</style>