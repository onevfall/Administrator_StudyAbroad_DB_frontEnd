<template>
  <div
    class="radius"
    :style="{
      borderRadius: `var(--el-border-radius-${'round'})`,
      boxShadow: `var(--el-box-shadow-${'dark'})`,
    }"
  >
    <div class="title">发布留学快讯</div>
    <!-- <div style="margin-left: 20%"> -->
      <!-- <div style="margin-left:-20%;display: inline-block">
        快讯标题：
         </div>
         
          <el-input
            v-model="messageTitle"
            class="inputControl"
            :rows="1"
            type="textarea"
            placeholder="请输入快讯标题"
            style="background: #e4e4e4"
          />
        
     
      <div>
       <div style="margin-left:-20%;margin-bottom:8%;display: inline-block">
        快讯内容：
         </div>
          
          <el-input
            v-model="messageContent"
            :rows="4"
            class="inputControl"
            type="textarea"
            placeholder="请输入快讯内容"
            style="margin-top:3%"
          />
       
      </div>
      <el-input
    v-model="textarea"
    :rows="2"
    type="textarea"
    placeholder="Please input"
  />
       <div style="margin-left:-20%;display: inline-block">
        快讯针对地区：
         </div>
       
        <el-input
          v-model="messageRegion"
          class="inputControl"
          :rows="1"
          type="textarea"
          placeholder="请输入快讯针对地区"
          style="margin-top:3%"
        />
        <el-form-item label="快讯tag：" style="margin-left:40%">
      
       
        <el-input
          v-model="messageTag"
          class="inputControl"
          :rows="1"
          type="textarea"
          placeholder="快讯tag"
          style="background: #e4e4e4"
        />
   </el-form-item> -->
   <div style="margin-left:20%;type:flex; justify:end">
    <div>
      <el-form-item label="快讯标题：" label-position="right" label-width="125px">
        <!-- <el-input placeholder="请输入快讯ID" /> -->
        <el-input v-model="messageTitle" 
        class="inputControl"
        :rows="1" 
        type="textarea" 
        placeholder="请输入快讯标题" 
        style="background:#e4e4e4"/>
      </el-form-item>
    </div>
    <div><el-form-item label="快讯内容：" label-position="right" label-width="125px">
        <!-- <el-input placeholder="请输入快讯ID" /> -->
        <el-input v-model="messageContent"
         :rows="4" 
         class="inputControl"
         type="textarea"
         placeholder="请输入快讯内容" 
         style="background:#e4e4e4"/>
      </el-form-item></div>
      <!-- <el-input
    v-model="textarea"
    :rows="2"
    type="textarea"
    placeholder="Please input"
  /> -->
    <el-form-item label="快讯针对地区：" label-position="right"  label-width="125px">
        <!-- <el-input placeholder="请输入快讯ID" /> -->
        <el-input v-model="messageRegion" 
        class="inputControl"
        :rows="1" 
        type="textarea" 
        placeholder="请输入快讯针对地区" 
        style="background:#e4e4e4"/>
      </el-form-item>
       <el-form-item label="快讯tag：" label-position="right" label-width="125px">
        <!-- <el-input placeholder="请输入快讯ID" /> -->
        <el-input v-model="messageTag" 
        class="inputControl"
        :rows="1" 
        type="textarea" 
        placeholder="快讯tag" 
        style="background:#e4e4e4"/>
      </el-form-item>
   </div>
      <!-- <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false"
        :multiple="false"
        :on-change="fileChange"
        :show-file-list="false"
      > -->
        <!-- url : 图片上传成功后接口返回的图片地址 -->
        <!-- <img
          v-if="url"
          :src="url"
          class="avatar"
          style="width: 100%; height: 100%"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->

      <el-button
        type="primary"
        @click="publishNews"
        style="margin-bottom: 10%"
      >
        发布
      </el-button>
    </div>
  <!-- </div> -->
</template>

<script>
import { ref } from "vue";

// import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

// import { UploadFile } from "element-plus";

// const dialogImageUrl = ref("");
// const dialogVisible = ref(false);
// const disabled = ref(false);

// const textarea = ref('')
export default {
  methods:{
    publishNews()
    {
      alert("发布！");
      console.log(this.messageContent);
      console.log(this.messageTag);
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
.el-textarea__inner {
  background: #e4e4e4;
}

/* .avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
} */
</style>