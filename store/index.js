import Vue from "vue"
import Vuex from "vuex"
import actions from "./actions.js"
import getters from "./getters.js"
import mutations from "./mutations.js"
Vue.use(Vuex);

let state = {
	hasLogin:false,  //登录状态
	loginWay:""  //登录方式
}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})

