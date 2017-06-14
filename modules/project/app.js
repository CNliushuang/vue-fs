import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import store from './store'
import $ from 'jquery'
import VueRouter from 'vue-router'
Vue.config.debug = true



/*配置路由*/
import Calendar from './components/Calendar.vue'
import Minder from './components/Minder.vue'
import Video from './components/Video.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/index', component: Calendar },
  { path: '/minder', component: Minder },
  { path: '/video', component: Video },
  { path: '*', component: Calendar },

]
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})


window.router = router;

/*初始化app*/
const app = new Vue({  
    router:router,  
    render: h => h(App)  
}).$mount('#app')
