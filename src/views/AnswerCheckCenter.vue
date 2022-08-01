<!--
描述：回答审核中心
作者：王若晗
-->

<template>
  <el-container>
    <el-main>
      <check-card :tocheck_info="this.answer_tocheck_info"
                  :checked_info="this.answer_checked_info"
                  :essence="this.essence">
      </check-card>

    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import CheckCard from "../components/CheckCard.vue";
export default ({
  name: "AnswerCheckCenter",
  components: {
    CheckCard,
  },
  data() {
    return {
      admin_id:99,
      answer_tocheck_info:[],
      answer_checked_info:[],
      essence:"回答",

    };
  },
  created(){
    axios({
      url: "check/all_answers",
      method: "get",
      params: {
        admin_id:this.admin_id,
      },
      })
      .then((res) => {
        console.log(res.data.data);
        for(var i=0;i<res.data.data.answer_list.length;i++)
        {
          res.data.data.answer_list[i].PostDate=res.data.data.answer_list[i].AnswerDate.replace("T"," ");
          res.data.data.answer_list[i].PostTitle=res.data.data.answer_list[i].AnswerSummary;
          res.data.data.answer_list[i].PostId=res.data.data.answer_list[i].AnswerId;
          res.data.data.answer_list[i].PostSupplement="原问题："+res.data.data.answer_list[i].QuestionTitle;

          if(res.data.data.answer_list[i].ReviewDate==null)
            this.answer_tocheck_info.push(res.data.data.answer_list[i]);
          else
          {
            res.data.data.answer_list[i].ReviewDate=res.data.data.answer_list[i].ReviewDate.replace("T"," ");
            this.answer_checked_info.push(res.data.data.answer_list[i]);
          }
        }
        console.log(this.answer.checked_info);
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