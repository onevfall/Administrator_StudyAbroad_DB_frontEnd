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

   <div style="margin-left:15%;type:flex; justify:end">
    <div>
      <el-form-item label="快讯标题：" label-position="right" label-width="125px">
       
        <el-input v-model="messageTitle" 
        class="inputControl"
        :rows="1" 
        type="textarea" 
        placeholder="请输入快讯标题" 
        />
      </el-form-item>
    </div>
  
      
    <el-form-item label="快讯针对地区：" label-position="right"  label-width="125px">
       
        <el-input v-model="messageRegion" 
        class="inputControl"
        :rows="1" 
        type="textarea" 
        placeholder="请输入快讯针对地区" 
        />
      </el-form-item>
       <el-form-item label="快讯tag：" label-position="right" label-width="125px">
        
        <el-input v-model="messageTag" 
        class="inputControl"
        :rows="1" 
        type="textarea" 
        placeholder="快讯tag" 
        />
      </el-form-item>
      <el-form-item label="快讯内容：" label-position="right" label-width="125px">
        <div class="content_input_field">
      <editor ref="text_editor"  @editorSubmit="publishNews" />
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
       
      <!-- <el-button
        type="primary"
        @click="publishNews"
        style="margin-bottom: 10%"
      >
        发布
      </el-button> -->
    </div>
  <!-- </div> -->
</template>

<script>
import Editor from "../components/Editor";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {

  components: {
    Editor,
  },
  methods:{
    callEditor() {
      
      
      this.$refs.text_editor.submit();
      
    },
    publishNews(args)
    {
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
      } else if (args.text_content.length < 15) {
        summary = args.text_content;
      } else {
        summary = args.text_content.slice(0, 15);
      }
      var image_url = "";
      if (args.image_array.length != 0) {
        image_url = args.image_array[0]; //选第一张图片
      }

     axios.post("newsflash/release", {
          title:this.messageTitle,
        tag:this.messageTag,
        region:this.messageRegion,
       summary: summary,
        content:args.base64_content,
        image_url:image_url,
        })
        .then((res) => {
          console.log("下面应该是后端返回值");
          console.log(res);
          console.log("上面应该是后端返回值")
          // if (res.data.status == true) 
          {
            this.fullscreenLoading = false;
            ElMessage({
              type: "success",
              message: "提交成功，正在等待审核",
              duration: 2000,
              showClose: true,
            });
            this.$router.back();

          }
        })
        .catch((errMsg) => {
          this.fullscreenLoading = false;
          ElMessage({
              type: "warning",
              message: "提交失败，请检查网络连接",
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
      messageRegion:"",
      messageTag:"",
    };
  },
  create()
  {
    
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

.content_input_field{
  margin-right:30%
}
.mine_button {
  margin-left: 45%;
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