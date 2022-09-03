<template>
  <div
    class="school-center-layout"
    v-loading.fullscreen.lock="isLoading"
    element-loading-text="正在加载"
  >
    <el-card class="box-card" shadow="hover" style="height: auto">
      <div class="card-header">查询高校信息</div>
      <div class="search_component">
        <el-select
          v-model="search_value"
          filterable
          remote
          clearable
          placeholder="请输入大学名称"
          :remote-method="remoteMethod"
          :loading="loading"
          size="large"
        >
          <el-option
            v-for="item in all_school_list"
            :key="item.university_id"
            :label="item.university_chname"
            :value="item.university_id"
          />
        </el-select>
        <span style="margin: 10px; vertical-align: bottom">
          <!-- 搜索键 -->
          <el-button
            type="warning"
            size="large"
            color="#626aef"
            @click="goSearch"
            >搜索</el-button
          >
        </span>

        <span style="margin-left: 30px; vertical-align: bottom">
          <!-- 搜索键 -->
          <el-button
            type="warning"
            size="large"
            color="#626aef"
            @click="goAddSchool"
            >添加高校<el-icon size="large" style="margin-left: 5px"
              ><CirclePlus /></el-icon
          ></el-button>
        </span>
      </div>
    </el-card>

    <div class="left_text">
      当前高校列表如下,共【<span style="color: coral">{{ this.all_num }}</span
      >】所学校，按QS排名排列
    </div>
    <hr />
    <!-- 三个排名的罗列 -->
    <div class="rank_row">
      <p class="rank_text QS_rank_test">QS排名</p>
      <p class="rank_text">THE排名</p>
      <p class="rank_text">USNews排名</p>
    </div>
    <div class="downBox">
      <div v-for="(school, index) in school_list" :key="index">
        <school-card
          :school="school"
          @deletesuccess="refreshPage"
        ></school-card>
        <br />
      </div>
    </div>

    <div>
      <el-row justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="PAGESIZE"
          :total="all_num"
          @current-change="curChange"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SchoolCard from "../components/SchoolCard.vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    SchoolCard,
    ElMessage,
  },
  data() {
    return {
      cur_page: 1,
      page_num: 90,
      PAGESIZE: 5,
      all_num: 0,
      school_list: [], //经过筛选条件后下面展示的大学
      all_school_list: [], //最初赋值获得的所有大学
      search_value: "",
      isLoading: false,
    };
  },
  methods: {
    curChange(res) {
      this.cur_page = res;
      this.filter();
    },
    goSearch() {
      this.$router.push({
        path: "/modify_school_detail",
        query: {
          school_id: this.search_value,
        },
      });
    },
    goAddSchool() {
      this.$router.push({
        path: "/add_school",
      });
    },
    filter() {
      this.isLoading = true;
      var x = ""; //需要拼接的判断
      x =
        "?rank_year=2022" +
        "&" +
        "page=" +
        this.cur_page +
        "&" +
        "page_size=" +
        this.PAGESIZE +
        "&tag=QS_rank";
      axios({
        // 点击搜索时加载符合条件的数据
        url: "university/rank" + x,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          console.log(res.data.data.university_list);
          console.log("搜索成功");
          console.log(this.country_value);
          console.log(this.rank_type_value);
          this.school_list = res.data.data.university_list;
          this.isLoading = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("大失败");
        });
    },
    refreshPage(res) {
      if (res) {
        this.isLoading = true;
        axios({
          url: "university/num" + "?rank_year=2022",
          method: "get",
        }).then((res) => {
          console.log("已获取到数据");
          this.all_num = res.data.data.num;
          this.page_num = Math.ceil(res.data.data.num / this.PAGESIZE); //向上取整
          this.all_school_list = res.data.data.university_list;
          // 进行当页数据检索
          axios({
            url:
              "university/rank" +
              "?rank_year=2022" +
              "&" +
              "page_size=" +
              this.PAGESIZE +
              "&tag=QS_rank",
            method: "get",
          })
            .then((res) => {
              this.school_list = res.data.data.university_list;
              this.isLoading = false;
              this.cur_page = 1;
            })
            .catch((errMsg) => {
              console.log(errMsg);
              console.log("第二层初始化大失败");
            });
        });
      }
    },
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
    this.isLoading = true;
    axios({
      url: "university/num" + "?rank_year=2022",
      method: "get",
    })
      .then((res) => {
        console.log("已获取到数据");
        this.all_num = res.data.data.num;
        this.page_num = Math.ceil(res.data.data.num / this.PAGESIZE); //向上取整
        this.all_school_list = res.data.data.university_list;
        // 进行当页数据检索
        axios({
          url:
            "university/rank" +
            "?rank_year=2022" +
            "&" +
            "page_size=" +
            this.PAGESIZE +
            "&tag=QS_rank",
          method: "get",
        })
          .then((res) => {
            this.school_list = res.data.data.university_list;

            this.isLoading = false;
          })
          .catch((errMsg) => {
            console.log(errMsg);
            console.log("第二层初始化大失败");
          });
      })
      .catch((errMsg) => {
        console.log(errMsg);
        console.log("第一层初始化大失败");
      });
  },
};
</script>

<style>
.box-card {
  border-radius: 10px;
  height: 100%;
}
.card-header {
  font-family: SimSun;
  font-size: 40px;
  font-weight: 900;
  margin-left: 5%;
  margin-right: 70%;
  border-bottom: 6px grey solid;
}
.search {
  margin-top: 5%;
}
.rank_row {
  background: rgb(245, 242, 242);
  display: flex;
  margin: 20px;
}
p.rank_text {
  color: coral;
  font-size: 17px;
  margin-left: 45px;
}
p.QS_rank_test {
  margin-left: 8.5%;
  /* 120px; */
}
.left_text {
  color: cadetblue;
  text-align: left;
  margin: 20px;
  margin-left: 6%;
  font-size: 19px;
}
</style>


