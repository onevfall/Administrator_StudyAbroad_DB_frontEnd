import {
    createApp
} from 'vue'

//引入UI组件库
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'


//引入 router，Vuex，axios
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'

//配置全局baseURL默认值
axios.defaults.baseURL="/api"
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'
// axios.defaults.headers["Access-Control-Allow-Origin"]="*"
//引入 根组件
import App from './App.vue'
const app = createApp(App)
app.use(store).use(router).use(ElementPlus).mount('#app')

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}