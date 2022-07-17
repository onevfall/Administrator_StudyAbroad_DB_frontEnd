<template>
  <!-- <h1>这里是快讯管理页！</h1> -->
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
          <!-- <el-card shadow:hover class="card1" style="margin-top: 10%">
            发布留学快讯
            <el-button type="primary" @click="goPublishingPage"
              >发布页面</el-button
            >
          </el-card> -->
          <el-container>
            <el-main style="width: 50%">
              <el-card
                shadow:hover
                class="card1"
                style="background-color: aliceblue"
              >
                <div class="cardTitle1">发布留学快讯</div>
                <el-button type="primary" round @click="goPublishingPage">
                  去发布页面
                </el-button>
              </el-card>
            </el-main>
            <el-main style="width: 50%">
              <el-card
                shadow:hover
                class="card1"
                style="background-color: rgba(255, 240, 254, 0.674)"
              >
                <div class="cardTitle2">查询留学快讯</div>
                <el-form-item label="快讯ID">
                  <!-- <el-input placeholder="请输入快讯ID" /> -->
                  <input v-model="message" placeholder="请输入快讯ID" />
                </el-form-item>
                <el-button type="primary" round @click="refreshNews"
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
            style="background-color: aliceblue; margin-left: 3%; width: 93.5%"
          >
            <div class="cardTitle3">相关搜索结果</div>
            <el-divider>
              <div
                class="el-divider__text is-center"
                style="background: aliceblue"
              >
                <el-icon><star-filled /></el-icon>
              </div>
            </el-divider>
            <el-row justify="left" gutter="6" style="margin-bottom: 0px">
              <el-col span="8" :offset="20">
                <el-button type="primary" text @click="goPublishingPage">
                  修改
                </el-button>
              </el-col>
              <el-col span="8">
                <el-button type="primary" text @click="goPublishingPage">
                  撤销
                </el-button>
              </el-col>
            </el-row>
            <!-- <el-divider/> -->
            <!-- <el-row justify="left" gutter="60">
            <el-col span="8" :offset="20">
            <el-button type="primary" text @click="goPublishingPage">
              撤销
            </el-button>
             </el-col>
             </el-row> -->
            <el-row justify="left">
              <el-col span="24" style="text-align: left">
                <div style="font-weight: bold">快讯ID：</div>
                {{ news_info.NewsFlashId }}
              </el-col>
            </el-row>
            <el-row justify="left" style="text-align: left">
              <el-col span="24">
                <div style="font-weight: bold">快讯标题：</div>
                {{ news_info.NewsFlashTitle }}
              </el-col>
              <!-- <el-col span="8"> -->
              <!-- <el-button type="primary" text @click="goPublishingPage">
              修改
            </el-button> -->
              <!-- </el-col> -->
            </el-row>
            <el-row justify="left">
              <el-col span="24" style="text-align: left">
                <div style="font-weight: bold; text-align: left">
                  快讯时间：
                </div>
                {{ news_info.NewsFlashDate }}
              </el-col>
            </el-row>
            <el-row justify="left" style="text-align: left">
              <el-col span="24">
                <div style="font-weight: bold">快讯针对地区：</div>
                {{ news_info.NewsFlashRegion }}
              </el-col>
              <!-- <el-col span="8" :offset="6">
            <el-button type="primary" text @click="goPublishingPage">
              撤销
            </el-button>
             </el-col> -->
            </el-row>
            <!-- <el-row justify="left">
              <el-col span="24"> -->
            <div style="text-align: left">
              <div style="font-weight: bold">快讯内容：</div>
              {{ news_info.NewsFlashContent }}
            </div>
            <!-- </el-col>
            </el-row> -->
          </el-card>
        </el-main>
        <el-footer style="height: auto">
          全部快讯
          <el-divider />
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
                        style="width: 200px; height: auto"
                        :src="news.NewsFlashImage"
                        :fit="fit"
                      />
                    </el-aside>
                    <el-main style="width: 600px" class="mainColor">
                      <el-card>
                        <template #header>
                          <div class="card-header2">
                            ID：{{ news.NewsFlashId }}

                            <span style="width: 40%">
                              {{ news.NewsFlashTitle }}

                              <br />
                            </span>
                            <el-tag class="ml-2" type="primary" size="small">
                              {{ news.NewsFlashDate }}
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
                    <el-aside width="10%">
                      <el-button type="primary" text @click="goPublishingPage">
                        撤销
                      </el-button>
                      <el-button type="primary" text @click="goPublishingPage" style="margin-left:0%">
                        修改
                      </el-button>
                    </el-aside>
                  </el-container>
                </div>
              </li>
            </ul>
            <p v-if="loading">Loading...</p>
            <p v-if="noMore">No more</p>
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
    // goNewsDetail(new_info) {
    //   // alert("跳转至id为"+ this.new_info.NewsFlashId+"的快讯详情页面")
    //   console.log("开始跳");
    //   console.log(new_info.NewsFlashId);
    //   this.$router.push({
    //     path: "news",
    //     query: {
    //       news_id: new_info.NewsFlashId,
    //     },
    //   });
    // },
    refreshNews() {
      console.log("开始跳");
      console.log(this.message);
      this.$router.push({
        path: "news_collation",
        query: {
          news_id: this.message,
        },
      });
    },
    getParams() {
      this.news_id = this.$route.query.news_id;
      console.log("又回来了");
      console.log(this.$route.query.news_id);
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
      news_relevant: [],
      news_id: -1,
      message: "",
    };
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    // var tem_info = {
    //   NewsFlashId: 1,
    //   NewsFlashImage: "../assets/logo.png",
    //   NewsFlashDate: "2022-6-29",
    //   NewsFlashTitle: "黄渡理工暑期不允许留校学生出校",
    //   NewsFlashTag: "黄渡理工",
    //   NewsFlashRegion: "江苏",
    //   NewsFlashSummary:
    //     "近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，报道",
    // };
    // for (let i = 0; i < 4; ++i) {
    //   this.news_relevant.push(tem_info);
    // }
    // console.log(this.news_relevant);
    // this.news_info = tem_info;
    // console.log(this.news_info);
    // this.news_info.NewsFlashSummary =
    //   "123近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，报道近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，报道近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，报道近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，报道";
    axios({
      url: "newsflash/single" + "?newsflash_id=" + this.news_id,

      method: "get",
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.data);

        this.news_info = res.data.data;
        console.log(this.news_info);
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
    // axios({
    //   url: "newsflash/all",

    //   method: "get",
    // })
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
      console.log("2022");
      if (to.path == "/news_collation") {
        console.log(to.path);
        this.getParams();
        //在此处向服务器请求数据，给所需变量重新赋值
        axios({
          url: "newsflash/single" + "?newsflash_id=" + this.news_id,

          method: "get",
        })
          .then((res) => {
            console.log(this.news_id);
            console.log(res);
            console.log(res.data);
            console.log(res.data.data);

            this.news_info = res.data.data;
            console.log(this.news_info);
          })
          .catch((errMsg) => {
            console.log(errMsg);
          });
      }
    },
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
  margin-left: 2%;
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
  margin-bottom: 5%;
}
.mainColor {
  background-color: aliceblue;
  color: aliceblue;
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
  height: 250px;
  background: white;
}
</style>