const crypto = require("crypto")
const jwt = require("jwt-simple")
const db = uniCloud.database();

const {
  tokenExp
} = require('../../utils/constants.js')
const {   //加密方法
  encryptPassword
} = require('../../utils/encryptPassword.js')

async function login(event){
	const {
		password,
		phoneNum
	} = event;
	
	let userInfo = {
		phoneNum
	}
	
	let userInDB = await db.collection('users').where({
		phoneNum,
		password:encryptPassword(password)
	}).get()
	
	 let tokenSecret = crypto.randomBytes(16).toString('hex'),  //token
		 token = jwt.encode(userInfo,tokenSecret);
   
	let userUpdateResult;		
	if(userInDB.data && userInDB.data.length === 0){
		return {
		  status: -1,
		  msg: '用户名或密码不正确'
		}
	} else {
		
		//登录成功,更新token
		userUpdateResult = await db.collection('users').doc(userInDB.data[0]._id).update({
			tokenSecret,
			exp:Date.now() + tokenExp
		})
	}
	
	if(userUpdateResult.id || userUpdateResult.affectedDocs === 1){
		return{
			status:1,
			token,
			msg:"登录成功"
		}
	}
	
	return{
		status: -1,
		msg: '登录失败'
	}
}

exports.main = login