import {USER_LOGIN} from "./mutations-type.js"

export default {
	[USER_LOGIN](state,way){
		state.hasLogin = true;
		state.loginWay = way;
	}
}