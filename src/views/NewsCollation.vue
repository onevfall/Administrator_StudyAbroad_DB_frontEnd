<template>
  <div
    class="radius"
    :style="{
      borderRadius: `var(--el-border-radius-${'round'})`,
      boxShadow: `var(--el-box-shadow-${'dark'})`,
    }"
  >
    <div class="title">管理留学快讯</div>
    <section class="search_component">
      <el-row gutter="10">
        <el-col :span="1"></el-col>
        <el-col :span="8">
          <el-input
            v-model="newsKeyword"
            placeholder="请输入快讯标题关键字"
            clearable
            :prefix-icon="Search"
          />
        </el-col>
        <el-col :span="2">
          <span style="margin: 10px; vertical-align: bottom">
            <!-- 搜索键 -->
            <el-button
              type="warning"
              size="normal"
              color="#626aef"
              @click="searchNews"
              >搜索</el-button
            >
          </span>
        </el-col>
        <el-col :span="6">
          <button
            id="button"
            @click="goPublishingPage"
            style="margin-left: 15%"
          >
            <div class="svg-wrapper-1">
              <div class="svg-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path
                    fill="currentColor"
                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  ></path>
                </svg>
              </div>
            </div>
            <span>发布快讯</span>
          </button>
        </el-col>
        <el-col :span="5" v-if="show_page == false" @click="backToAllNews">
          <el-link type="primary" style="font-size: small"
            >返回全部快讯页</el-link
          >
        </el-col>
      </el-row>
    </section>
    <section>
      <div style="font-weight: bold; font-size: 25px" id="list_header">
        快讯列表
      </div>
      <el-divider style="margin-bottom: 0.5%">
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div
        class="infinite-list-wrapper"
        style="overflow: auto"
        v-loading="this.isLoading"
      >
        <ul
          class="list"
        >
          <li v-for="news in this.news_info_list" :key="news" class="list-item">
            <div class="common-layout2">
              <el-container>
                <el-aside width="200px">
                  <el-image
                    style="width: 198px; height: 183px"
                    :src="news.NewsFlashImage"
                    :fit="fit"
                    class="imgBorder"
                    v-if="news.NewsFlashImage != null"
                  />
                  <el-image
                    style="width: 198px; height: 183px"
                    src="../assets/logo.png"
                    :fit="fit"
                    class="imgBorder"
                    v-else
                  />
                </el-aside>
                <el-main style="width: 600px; height: 185px" class="mainColor">
                  <el-card style="height: 183px; background: aliceblue">
                    <template #header>
                      <div class="card-header2">
                        <span style="width: 40%">
                          {{ news.NewsFlashTitle }}

                          <br />
                        </span>
                        <el-tag class="ml-2" type="primary" size="small">
                          {{ news.NewsFlashDate.replace("T", " ") }}
                        </el-tag>
                        <el-tag class="ml-2" type="success" size="small">
                          {{ news.NewsFlashRegion }}
                        </el-tag>
                        <el-tag class="ml-2" type="warning" size="small">{{
                          news.NewsFlashTag
                        }}</el-tag>
                      </div>
                    </template>
                    <div class="content_main">
                      {{ news.NewsFlashSummary }}
                    </div>
                  </el-card>
                </el-main>
                <el-aside width="10%" class="mainColor">
                  <el-button
                    type="danger"
                    @click="callDeleteDialog(news.NewsFlashId)"
                    style="margin-top: 40%"
                  >
                    删除
                  </el-button>
                  <el-button
                    type="primary"
                    @click="reviseNews(news.NewsFlashId)"
                    style="margin-left: 0%; margin-top: 20%"
                  >
                    修改
                  </el-button>
                </el-aside>
              </el-container>
            </div>
          </li>
        </ul>
        <div class="pagination_field" v-if="show_page">
          <el-row justify="center">
            <el-pagination
              background
              layout="prev, pager, next"
              :page-size="PAGESIZE"
              :total="news_num_total"
              @current-change="curChange"
            />
          </el-row>
        </div>
      </div>
    </section>
  </div>
  <!-- 删除时的对话框 -->
  <el-dialog v-model="dialogVisible" title="警告" width="30%">
    <span>确认要删除该快讯？（此操作不可逆）</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteNews">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    ElMessage,
  },
  data() {
    return {
      count: ref(10),
      loading: ref(false),
      noMore: computed(() => this.count >= 20),
      disabled: computed(() => this.loading || this.noMore),
      news_info: "",
      news_info_list: [],
      newsId: 0,
      newsKeyword: "",
      news_num_total: 0,
      PAGESIZE: 6,
      isLoading: true,
      show_page: true,
      dialogVisible: false,
    };
  },
  methods: {
    backToAllNews() {
      this.isLoading = true;
      this.newsKeyword = "";
      let get_news_list = axios
        .get("newsflash/all?page=1&page_size=" + this.PAGESIZE)
        .then((res) => {
          console.log(res);
          this.news_info_list = [].concat(res.data.data.newsflashs);
        })
        .catch((err) => {
          console.log(err);
        });
      let get_news_num = axios
        .get("newsflash/num")
        .then((res) => {
          this.news_num_total = res.data.data.num;
        })
        .catch((err) => {
          console.log(err);
        });
      Promise.all([get_news_list, get_news_num])
        .then(() => {
          this.show_page = true;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    curChange(res) {
      this.isLoading = true;
      axios
        .get("newsflash/all?page=" + res + "&page_size=" + this.PAGESIZE)
        .then((res) => {
          this.news_info_list = [].concat(res.data.data.newsflashs);
          this.isLoading = false;
          let ele = document.getElementById("list_header");
          ele.scrollIntoView();
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
    },
    goPublishingPage() {
      this.$router.push({
        path: "news_release",
        query: {
          news_id: -1,
        },
      });
    },
    callDeleteDialog(id) {
      this.newsId = id;
      this.dialogVisible = true;
    },
    deleteNews() {
      axios.delete('newsflash?newsflash_id='+this.newsId).then(res=>{
        this.dialogVisible = false;
        this.backToAllNews();
        ElMessage({
          message: '删除成功',
          type: 'success'
        });
      }).catch(err=>{
        console.log(err);
        this.dialogVisible = false;
        ElMessage({
          message: '删除失败',
          type: 'error'
        });
      })
    },
    reviseNews(id) {
      this.$router.push({
        path: "news_release",
        query: {
          news_id: id,
        },
      });
    },
    searchNews() {
      if (this.newsKeyword.length == 0) {
        ElMessage({
          message: "请输入关键词",
          type: "warning",
          duration: 3000,
          showClose: true,
        });
        return;
      }
      this.isLoading = true;
      axios
        .get("newsflash/search" + "?keyword=" + this.newsKeyword)
        .then((res) => {
          if (res.data.data.newsflashs.length == 0) {
            ElMessage({
              message: "没有找到相关快讯",
              type: "warning",
              duration: 3000,
              showClose: true,
            });
            this.newsKeyword = "";
            this.isLoading = false;
            return;
          }
          this.news_info_list = [].concat(res.data.data.newsflashs);
          this.news_num_total = this.news_info_list.length;
          this.show_page = false;
          this.isLoading = false;
        })
        .catch((err) => {
          console.log(err);
          this.isLoading = false;
        });
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
    //在此处向服务器请求数据，初始化所需变量
    let get_news_list = axios
      .get("newsflash/all?page=1&page_size=" + this.PAGESIZE)
      .then((res) => {
        console.log(res);
        this.news_info_list = [].concat(res.data.data.newsflashs);
      })
      .catch((err) => {
        console.log(err);
      });
    let get_news_num = axios
      .get("newsflash/num")
      .then((res) => {
        this.news_num_total = res.data.data.num;
      })
      .catch((err) => {
        console.log(err);
      });
    Promise.all([get_news_list, get_news_num])
      .then(() => {
        this.isLoading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.radius {
  align-items: center;
  width: 98%;
  border: 1px solid var(--el-border-color);
  border-radius: 0;
  margin-top: 20px;
  height: max-content;
  background-color: white;
}
.title {
  font-family: SimSun;
  font-size: 40px;
  font-weight: 900;
  margin-left: 5%;
  margin-right: 70%;
  margin-bottom: 15px;
  border-bottom: 6px grey solid;
}
.card1 {
  width: 95%;
  height: 200px;
  margin-left: -4.5%;
  font-weight: bold;
  font-size: 25px;
  font-family: "Times New Roman", Times, serif;
}
.card2 {
  width: 95%;
  height: 200px;
  margin-left: 7%;
  font-weight: bold;
  font-size: 25px;
  font-family: "Times New Roman", Times, serif;
}
.cardTitle1 {
  text-align: left;

  border-bottom: 4px rgb(192, 140, 192) solid;
  margin-bottom: 15%;
}
.cardTitle2 {
  text-align: left;
  margin-bottom: 5%;
  border-bottom: 4px rgb(140, 144, 192) solid;
}

.card3 {
  width: 95%;
  height: auto;
}
.cardTitle3 {
  text-align: left;
  font-family: "Times New Roman", Times, serif;
}

.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.common-layout2 {
  margin-bottom: 0%;
}
.mainColor {
  background-color: aliceblue;
  color: aliceblue;
  padding: 0px;
  /* border-top: 1px grey solid;
  border-bottom: 1px grey solid;
  border-right: 1px grey solid; */
}
.card-header2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: rgb(30, 23, 118);
}
.content_main {
  text-align: left;
}
.infinite-list-wrapper {
  text-align: center;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  background: white;

  margin-bottom: 3%;
  margin-left: -4.5%;
}
.imgBorder {
  border: 1px rgb(166, 209, 247) solid;
}

#button {
  font-family: inherit;
  background: #409eff;
  color: white;
  padding: 0.38em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
}

#button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

#button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

#button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

#button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

#button:hover span {
  transform: translateX(5em);
}

#button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}
.pagination_field {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
