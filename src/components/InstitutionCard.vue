<!--
描述：机构中心主页用于搜索时显示的机构卡片
作者：蔡明宏
-->
<template>
  <div class="institution_card">
    <el-card class="two_block hover_card">
      <div class="two_block_hori">
        <div>
          <div class="avatar_text">
            <el-avatar shape="square" :size="70" :src="institution.institutionProfile" />
            <div>
                <p class="enname">{{ institution.institutionName }}</p>
            </div>
          </div>
          <!-- 下面主要介绍机构简介 -->
          <div>
              <div style="margin:10px;"> 
                <div>
                    <span class="info_text">简介：</span>
                    <span style="color:gray;">{{institution.institutionIntroduction}}</span>
                </div>
              </div>
          </div>
        </div>

        <!-- 右侧点击去看看 -->

        <div class="myButton">
          <div>
          <el-button type="warning" size="large" color="#626aef" @click="modifyInstitution"
            >修改</el-button
          >
          </div>
          <div>
          <el-button type="danger" size="large"  @click="delete_dialog_visible = true"
            >删除</el-button
          >
          </div>
        </div>
      </div>
    </el-card>
    <el-dialog
      v-model="delete_dialog_visible"
      title="警告"
      width="30%"
      :before-close="handleClose"
    >
      <span style="font-size:18px">你确认要删除该机构信息吗? 此操作不可逆!</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="deleteInstitution">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  props: [
    'institution',
  ],
  data() {
    return {
      delete_dialog_visible: false,
    };
  },
  methods: {
    handleClose() {
      this.delete_dialog_visible = false;
    },
    modifyInstitution(){
      // <router-link target="_blank" :to="{path:'/home',query:{id:'1'}}">新页面打开home页</router-link>;
      this.$router.push({
        path:'/modify_institution_detail',  //还未加跳转
        query:{
          institution_id:this.institution.institutionId
        }
      })
    },
    deleteInstitution(){
      axios.delete(
        'institution', {	
      params: {	// 请求参数拼接在url上
        institution_id: this.institution.institutionId,
      }
    })
      .then((res) => {
        this.delete_dialog_visible = false;
        console.log(res);
        if (res.data.status == true){
          ElMessage.success("删除成功!");
          this.$emit("deletesuccess",true);
        }else {
          ElMessage.error("删除失败!");
        }
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
      
    }
  },
};
</script>

<style>
.hover_card:hover{
  border: #61acf6 0.2em solid;
}
.institution_card {
  margin: 20px;
  width: 95%;
  height: 20%;
  display: flex;
  justify-content: center;
}
.two_block {
  margin-left: 40x;
  padding: 10px;
  height: 20%;
  width: 60%;
  /* align-self: center; */
}
.two_block_hori {
  display: flex;
  justify-content: space-between;
}
.avatar_text {
  display: flex;
}
p.enname{
    color:rgb(57, 47, 65);
    font-family:"Lucida Console", "Courier New", monospace;
    font-size: 20px;
    margin-left:30px;
    margin-top:10px;
}
p.chname{
    color:dimgray;
    font-family:'Times New Roman', Times, serif;
    float:left;
    margin-top:-10px;
    margin-left:30px;
}
span.info_text{
    font-family: Arial, Helvetica, sans-serif;
    font-size:18px;
    color: rgb(121, 75, 75);
}

</style>
