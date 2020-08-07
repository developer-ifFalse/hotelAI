const crypto = require("crypto")
const jwt = require("jwt-simple")
const db = uniCloud.database();
const {
  tokenExp
} = require('../../utils/constants.js')
async function phonelogin(event){
	let {
		phoneNum
	} = event;
	
	let userInfo = {
		phoneNum
	}
	
	let userInDB = await db.collection('users').where({
		phoneNum
	}).get()
	
		
	if(userInDB.affectedDocs === 0 && userInDB.data.length === 0){
		 return {
			 status:-1,
			 msg:"您还没注册，请先注册"
		 }
	}
	
	let tokenSecret = crypto.randomBytes(16).toString('hex'),  //token
			 token = jwt.encode(userInfo,tokenSecret);
			 
	let userUpdateResult;
	userUpdateResult = await db.collection('users').doc(userInDB.data[0]._id).update({
		tokenSecret,
		exp:Date.now() + tokenExp
	})
	
	if(userUpdateResult.id || userUpdateResult.affectedDocs === 1){
		return{
			status:1,
			token,
			msg:"登录成功"
		}
	}
	
	return{
		status: -1,
		msg: '服务器繁忙，稍后重试！'
	}
	
}

exports.main = phonelogin;