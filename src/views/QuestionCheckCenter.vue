<!--
描述：问题审核中心
作者：王若晗
-->
<template>
  <el-container>
    <el-main>
      <check-card :tocheck_info="this.question_tocheck_info"
                  :checked_info="this.question_checked_info"
                  :essence="this.essence">
      </check-card>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import CheckCard from "../components/CheckCard.vue";
export default ({
  name: "QuestionCheckCenter",
  components: {
    CheckCard,
  },
  data() {
    return {
      admin_id:99,
      question_tocheck_info:[],
      question_checked_info:[],
      essence:"提问",
    };
  },
  created(){
    axios({
      url: "check/all_questions",
      method: "get",
      params: {
        admin_id:this.admin_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        for(var i=0;i<res.data.data.question_list.length;i++)
        {
          res.data.data.question_list[i].QuestionDate=res.data.data.question_list[i].QuestionDate.replace("T"," ");
          if(res.data.data.question_list[i].ReviewDate!=null)
            {
              res.data.data.question_list[i].ReviewDate=res.data.data.question_list[i].ReviewDate.replace("T"," ");
              res.data.data.question_list[i].PostTitle=res.data.data.question_list[i].QuestionTitle;
              res.data.data.question_list[i].PostSupplement=res.data.data.question_list[i].QuestionSummary;
              this.question_checked_info.push(res.data.data.question_list[i]);
            }
          else
            {
              res.data.data.question_list[i].PostTitle=res.data.data.question_list[i].QuestionTitle;
              res.data.data.question_list[i].PostId=res.data.data.question_list[i].QuestionId;
              res.data.data.question_list[i].PostDate=res.data.data.question_list[i].QuestionDate;
              this.question_tocheck_info.push(res.data.data.question_list[i]);
            }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
})
</script>

<style scoped>
  .el-main{
    padding:50px 30px 30px 50px;
  }
</style>