<template>
  <div
    class="radius"
    :style="{
      borderRadius: `var(--el-border-radius-${'round'})`,
      boxShadow: `var(--el-box-shadow-${'dark'})`,
    }"
    style="background: #e4e4e4"
  >
    <div class="title">发布留学快讯</div>

    <div style="margin-left: 15%; type: flex; justify: end">
      <div>
        <el-form-item
          label="快讯标题："
          label-position="right"
          label-width="125px"
        >
          <el-input
            v-model="messageTitle"
            class="inputControl"
            :rows="1"
            type="textarea"
            placeholder="请输入快讯标题"
          />
        </el-form-item>
      </div>

      <el-form-item
        label="快讯针对地区："
        label-position="right"
        label-width="125px"
      >
        <el-input
          v-model="messageRegion"
          class="inputControl"
          :rows="1"
          type="textarea"
          placeholder="请输入快讯针对地区"
        />
      </el-form-item>
      <el-form-item
        label="快讯tag："
        label-position="right"
        label-width="125px"
      >
        <el-checkbox-group v-model="tagList">
          <el-checkbox label="生活" />
          <el-checkbox label="娱乐" />
          <el-checkbox label="学习" />
          <el-checkbox label="科研" />
        </el-checkbox-group>
      </el-form-item>
      <el-form-item
        label="快讯内容："
        label-position="right"
        label-width="125px"
      >
        <div class="content_input_field" v-loading="oss_loading">
          <editor ref="text_editor" @editorSubmit="publishNews" />
        </div>
      </el-form-item>
      <button
        @click="callEditor"
        class="mine_button"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="正在提交..."
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
        <span>发布</span>
      </button>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  components: {
    Editor,
  },
  // mounted: function () {

  //     this.$refs.text_editor.defaultContent(this.messageContent);
  //     console.log(this.messageContent);
  //     console.log(this.messageTitle);
  //     console.log("以上打出了默认值");
  //   },
  methods: {
    callEditor() {
      if (this.tagList.length == 0) {
        ElMessage({
          message: "请选择至少一个关键词",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.$refs.text_editor.submit();
      }
    },
    publishNews(args) {
      this.fullscreenLoading = true;
      //处理summary
      var summary = "";
      if (args.text_content.length == 0) {
        ElMessage({
          message: "请输入有效内容",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        return;
      } else if (args.text_content.length < 300) {
        summary = args.text_content;
      } else {
        summary = args.text_content.slice(0, 300);
      }
      var tag = "";
      for (let i = 0; i < this.tagList.length; ++i) {
        tag += this.tagList[i] + "-";
      }
      tag = tag.slice(0, tag.length - 1);
      var image_url = "";
      if (args.image_array.length != 0) {
        image_url = args.image_array[0]; //选第一张图片
      }
      axios
        .post("newsflash/release", {
          title: this.messageTitle,
          tag: tag,
          region: this.messageRegion,
          summary: summary,
          content: args.base64_content,
          image_url: image_url,
        })
        .then((res) => {
          console.log("下面应该是后端返回值");
          console.log(res);
          console.log("上面应该是后端返回值");
          if (res.data.status == true) {
            this.fullscreenLoading = false;
            ElMessage({
              type: "success",
              message: "发布成功！",
              duration: 2000,
              showClose: true,
            });
            this.$router.back();
          } else {
            this.fullscreenLoading = false;

            ElMessage({
              type: "warning",
              message: "发布失败，请输入合法字段",
              duration: 2000,
              showClose: true,
            });
          }
        })
        .catch((errMsg) => {
          this.fullscreenLoading = false;
          ElMessage({
            type: "warning",
            message: "发布失败，请检查网络连接",
            duration: 2000,
            showClose: true,
          });
          console.log(errMsg);
        });
    },
  },
  data() {
    return {
      messageTitle: "",
      messageContent: "",
      messageRegion: "",
      // messageTag:"",
      tagList: [],
      newsId: 0,
      news_info: "",
      oss_loading:true
    };
  },
  created() {
    console.log("初始化该页面的信息");
    this.newsId = this.$route.query.news_id;
    axios({
      url: "newsflash/single" + "?newsflash_id=" + this.newsId,
      method: "get",
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        console.log(res.data.data);

        this.news_info = res.data.data;
        console.log(this.news_info);
        console.log(this.news_info.NewsFlashTitle);
        this.messageTitle = this.news_info.NewsFlashTitle;
        this.messageContent = this.news_info.NewsFlashContent;
        this.messageRegion = this.news_info.NewsFlashRegion;
        
        const xhrFile = new XMLHttpRequest();
          console.log('开始解析oss');
          xhrFile.open("GET", this.messageContent, true);
          xhrFile.send();
          xhrFile.onload = () => {
            //res.data.data.blog_content=xhrFile.response;
            this.messageContent = xhrFile.response;

            console.log('oss解析完成');
            this.$refs.text_editor.getdefaultContent(this.messageContent);
            this.oss_loading=false;
          };
          
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
};
</script>

<style>
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
  margin-bottom: 7%;
  border-bottom: 7px grey solid;
}

.inputControl {
  width: 70%;
}

.content_input_field {
  margin-right: 30%;
}
.mine_button {
  margin-left: 40%;
  margin-top: 2vh;
  font-family: inherit;
  font-size: 16px;
  background: rgb(37, 150, 249);
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
}

.mine_button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.mine_button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

.mine_button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

.mine_button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

.mine_button:hover span {
  transform: translateX(5em);
}

.mine_button:active {
  transform: scale(0.95);
}
</style>
