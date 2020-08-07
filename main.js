import Vue from 'vue'
import App from './App'
import store from "./store/index.js"
import $router, { $route } from '@/common/uni_router.js'
Vue.prototype.$store = store
Vue.config.productionTip = false

import uView from "@/uview";
Vue.use(uView);

App.mpType = 'app'



Vue.prototype.$cloud = uniCloud.init({
	provider: 'aliyun',
	spaceId: 'e93797c9-744a-4bf1-a348-2c0aab456a6d',
	clientSecret: 'A/mxY71ko/Vjvw/OlKgQ+A=='
})


// $router.beforeEach = (to, next) => { // 注册全局前置守卫
//     console.log('全局前置守卫', to)
//     if (to.path.includes('/test')) {
//         // 可以通过传一个回调给 next 来访问 $router 实例, 会返回一个 reject('在全局前置守卫 next 中重定向路由')
//         next(vm => {
//             vm.push('/redirect')
//         })
//     } else if (to.path.includes('/redirect')) {
//         next(false) //  中断当前的导航,会返回一个 reject('在全局前置守卫 next 中取消路由')
//     } else {
//         next() // 一定要调用该方法来 resolve 这个钩子
//     }
// }

$router.afterEach = to => { // 注册一个全局后置守卫
	// console.log('全局后置守卫', to)
}

Vue.prototype.$route = $route // 当前路由对象，保存路由当前信息
Vue.prototype.$router = $router // 路由对象，保存了实例方法


const app = new Vue({
    ...App,
	store
})
app.$mount()
