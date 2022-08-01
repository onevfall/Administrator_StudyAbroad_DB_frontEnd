<template>
  <div
    class="radius"
    :style="{
      borderRadius: `var(--el-border-radius-${'round'})`,
      boxShadow: `var(--el-box-shadow-${'dark'})`,
    }"
  >
    <div class="title">管理留学快讯</div>
    <div class="common-layout">
      <el-container>
        <el-header style="height: 220px">
          <el-container>
            <el-main style="width: 60%">
              <el-card shadow:hover class="card1">
                <div class="cardTitle1">发布留学快讯</div>
                <el-button type="primary" round @click="goPublishingPage">
                  去发布页面
                </el-button>
              </el-card>
            </el-main>
            <el-main style="width: 60%">
              <el-card
                shadow:hover
                class="card2"
                style="background-color: rgba(255, 240, 254, 0.674)"
              >
                <div class="cardTitle2">查询留学快讯</div>
                <el-form-item label="查找快讯">
                  <input v-model="newsKeyword" placeholder="请输入快讯关键字" />
                </el-form-item>
                <el-button type="primary" round @click="searchNews"
                  >查询</el-button
                >
              </el-card></el-main
            >
          </el-container>
        </el-header>
        <el-main>
          <el-card
            shadow:hover
            class="card3"
            style="background: whitesmoke; width: 99%"
          >
            <div class="cardTitle3">相关搜索结果</div>
            <el-divider>
              <div
                class="el-divider__text is-center"
                style="background-color: whitesmoke"
              >
                <el-icon><star-filled /></el-icon>
              </div>
            </el-divider>

            <div class="infinite-list-wrapper">
              <ul
                v-infinite-scroll="load"
                class="list"
                :infinite-scroll-disabled="disabled"
              >
                <li
                  v-for="news in this.news_info_list"
                  :key="news"
                  class="list-item"
                >
                  <div class="common-layout2">
                    <el-container>
                      <el-aside width="200px">
                        <el-image
                          style="width: 198px; height: 183px"
                          :src="news.NewsFlashImage"
                          :fit="fit"
                          class="imgBorder"
                        />
                      </el-aside>
                      <el-main
                        style="width: 550px; height: 185px"
                        class="mainColor"
                      >
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
                              <el-tag
                                class="ml-2"
                                type="warning"
                                size="small"
                                >{{ news.NewsFlashTag }}</el-tag
                              >
                            </div>
                          </template>
                          <div class="content_main">
                            {{ news.NewsFlashSummary }}
                          </div>
                        </el-card>
                      </el-main>
                      <el-aside width="10%" class="mainColor">
                        <el-button
                          type="primary"
                          @click="deleteNews"
                          style="margin-top: 40%"
                        >
                          撤销
                        </el-button>
                        <el-button
                          type="primary"
                          @click="reviseNews"
                          style="margin-left: 0%; margin-top: 20%"
                        >
                          修改
                        </el-button>
                      </el-aside>
                    </el-container>
                  </div>
                </li>
              </ul>
            </div>
          </el-card>
        </el-main>
        <el-footer style="height: auto">
          <div style="font-weight: bold; font-size: 25px">全部快讯</div>
          <el-divider style="margin-bottom: 0.5%">
            <el-icon><star-filled /></el-icon>
          </el-divider>
          <div class="infinite-list-wrapper" style="overflow: auto">
            <ul
              v-infinite-scroll="load"
              class="list"
              :infinite-scroll-disabled="disabled"
            >
              <li
                v-for="news in this.news_relevant"
                :key="news"
                class="list-item"
              >
                <div class="common-layout2">
                  <el-container>
                    <el-aside width="200px">
                      <el-image
                        style="width: 198px; height: 183px"
                        :src="news.NewsFlashImage"
                        :fit="fit"
                        class="imgBorder"
                      />
                    </el-aside>
                    <el-main
                      style="width: 600px; height: 185px"
                      class="mainColor"
                    >
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
                        type="primary"
                        @click="deleteNews(news.NewsFlashId)"
                        style="margin-top: 40%"
                      >
                        撤销
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
            <p v-if="loading" style="margin-top: 10%">Loading...</p>
            <p v-if="noMore" style="margin-top: 10%">No more</p>
          </div>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { computed, ref } from "vue";
export default {
  methods: {
    goPublishingPage() {
      this.$router.push({
        path: "news_release",
      });
    },
    deleteNews(id) {
      // alert("将删除这条快讯");
      axios({
        url: "newsflash" + "?newsflash_id=" + id,

        method: "delete",
      })
        .then((res) => {
          console.log(id);
          console.log(res);
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
        console.log("删除快讯的id是");console.log(id);
      this.$router.push({
        path: "news_collation",
        query: {
          news_id: -1,
          news_keyword: id,
        },
      });
      
    },
    reviseNews(id) {
      // alert("将修改这条快讯");
      this.$router.push({
        path: "news_release",
        query: {
          news_id: id,
        },
      });
    },
    searchNews() {
      console.log(this.newsKeyword);
      this.$router.push({
        path: "news_collation",
        query: {

          news_id: 0,
          news_keyword: this.newsKeyword,
        },
      });
    },
    getParams() {
      console.log("获取参数中");
      this.newsKeyword = this.$route.query.news_keyword;
      this.newsId=this.$route.query.news_id;
      console.log(this.$route.query.news_id);
      console.log(this.$route.query.news_keyword);
    },
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
  },
  data() {
    return {
      count: ref(10),
      loading: ref(false),
      noMore: computed(() => this.count >= 20),
      disabled: computed(() => this.loading || this.noMore),
      news_info: "",
      news_info_list: [],
      news_relevant: [],
      newsId: 0,
      newsKeyword: "",
    };
  },
  created() {
    axios
      .get("newsflash/all")
      .then((res) => {
        console.log("test");
        console.log(res);

        console.log(res.data);
        console.log(res.data.data);
        console.log(res.data.data.newsflashs);
        this.news_relevant = res.data.data.newsflashs;
        console.log(this.news_relevant);
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
  watch: {
    $route(to, from) {
      console.log("进入watch");
      if(to.path == "/news_collation"){
      this.getParams();
      if (to.path == "/news_collation" && this.newsId != -1) {
        console.log(to.path);

        //在此处向服务器请求数据，给所需变量重新赋值
        axios({
          url: "newsflash/search" + "?keyword=" + this.newsKeyword,

          method: "get",
        })
          .then((res) => {
            console.log(this.newsKeyword);
            console.log(res);
            console.log(res.data);
            console.log(res.data.data);

            this.news_info_list = res.data.data.newsflashs;

            console.log(this.news_info_list);
          })
          .catch((errMsg) => {
            console.log(errMsg);
          });
        axios({
          url: "newsflash/single" + "?newsflash_id=" + this.newsKeyword,

          method: "get",
        })
          .then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.data);

            this.news_info_list.push(res.data.data);
            console.log(this.news_info);
          })
          .catch((errMsg) => {
            console.log(errMsg);
          });
      } else if (to.path == "/news_collation" &&this.newsId == -1) {
        this.newsId=0;
        axios
          .get("newsflash/all")
          .then((res) => {
           
            console.log("以下是从后端获得的数据")
            console.log(res.data.data);
            console.log(res.data.data.newsflashs);
            this.news_relevant = res.data.data.newsflashs;
            console.log(this.news_relevant);
          })
          .catch((errMsg) => {
            console.log(errMsg);
          });
          
      }
    }
    }
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
  font-size: 30px;
  font-family: "Times New Roman", Times, serif;
  text-align: left;
  font-weight: bold;
  margin-left: 5%;
  margin-right: 76%;
  margin-top: 3%;

  border-bottom: 7px grey solid;
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
</style>