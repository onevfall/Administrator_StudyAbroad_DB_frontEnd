import { createStore } from 'vuex'

export default createStore({
  state: {
    admin_info: {
      administrator_createtime:"",
      administrator_email:"",
      administrator_gender:"",
      administrator_id:-1,
      administrator_name:"",
      administrator_phone:"",
      administrator_profile:"",
    },
    is_login: false,
  },
  getters: {
  },
  mutations: {
    loginIn(state,admin_info){
      state.is_login=true;
      state.admin_info=admin_info;
      state.admin_info.administrator_gender = (admin_info.administrator_gender == 'f' ? '女' : '男');
    },
    //登出
    loginOut(state){
      state.is_login=false;
      state.admin_info={
        AdministratorCreatetime:"",
        AdministratorEmail:"",
        AdministratorGender:"",
        AdministratorId:-1,
        AdministratorName:"",
        AdministratorPhone:"",
        AdministratorProfile:"",
      }
    },
  },
  actions: {
  },
  modules: {
  },
  strict: true
})
