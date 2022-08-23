<!--
描述：学历审核中心
作者：王若晗
-->

<template>
  <el-container>
    <el-main>
      <check-card :tocheck_info="this.qualification_tocheck_info"
                  :checked_info="this.qualification_checked_info"
                  :essence="this.essence">
      </check-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import CheckCard from "../components/CheckCard.vue";
import { ElMessage } from "element-plus";
export default ({
  name: "QualificationCheckCenter",
  components: {
    CheckCard,
    ElMessage
  },
  data() {
    return {
      qualification_tocheck_info:[],
      qualification_checked_info:[],
      essence:"学历",
    };
  },
  created(){
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
    axios({
      url: "check/all_qualifications",
      method: "get",
      params: {
        admin_id:this.$store.state.admin_info.administrator_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        for(var i=0;i<res.data.data.qualification_list.length;i++)
        {
          res.data.data.qualification_list[i].PostDate=res.data.data.qualification_list[i].SummitDate.replace("T"," ");
          res.data.data.qualification_list[i].PostTitle=res.data.data.qualification_list[i].UniversityChName+" "
                                                        +res.data.data.qualification_list[i].Identity+" "
                                                        +res.data.data.qualification_list[i].Major;
          res.data.data.qualification_list[i].PostId=res.data.data.qualification_list[i].IdentityId;
          if(res.data.data.qualification_list[i].ReviewDate==null)
            this.qualification_tocheck_info.push(res.data.data.qualification_list[i]);
          else
          {
            res.data.data.qualification_list[i].ReviewDate=res.data.data.qualification_list[i].ReviewDate.replace("T"," ");
            this.qualification_checked_info.push(res.data.data.qualification_list[i]);
          }
          console.log(this.qualification_checked_info);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
})
</script>