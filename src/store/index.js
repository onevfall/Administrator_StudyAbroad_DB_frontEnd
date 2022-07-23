import { createStore } from 'vuex'

export default createStore({
  state: {
    admin_info: {
      AdministratorCreatetime:"",
      AdministratorEmail:"",
      AdministratorGender:"",
      AdministratorId:-1,
      AdministratorName:"",
      AdministratorPhone:"",
      AdministratorProfile:"",
    },
    is_login: false,
  },
  getters: {
  },
  mutations: {
    loginIn(state,admin_info){
      state.is_login=true;
      state.admin_info=admin_info;
      state.admin_info.AdministratorGender = (admin_info.AdministratorGender == 'f' ? '女' : '男');
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
