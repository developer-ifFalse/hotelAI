const crypto = require('crypto');
const jwt = require('jwt-simple')
const {
  tokenExp
} = require('../../utils/constants.js')
const {   //加密方法
  encryptPassword
} = require('../../utils/encryptPassword.js')

const db = uniCloud.database()
async function register(event) {
	let {
		phoneNum,
		password,
		verifyNum
	} = event
	
	// let obj = {
	// 	phoneNum:"24234234234",
	// 	password:"sdcvdsvsdv"
	// }
	
	let userInfo = {
		phoneNum
	}
	
	let userInDB = await db.collection('users').where(userInfo).get();
	
	let tokenSecret = crypto.randomBytes(16).toString('hex');  //用来生成token
	let token = jwt.encode(userInfo,tokenSecret)
	
	let userUpdateResult;
	
	if(userInDB.data && userInDB.data.length === 0){  //如果不存在该用户
		userUpdateResult = await db.collection('users').add({
			...userInfo,
			password:encryptPassword(password),
			tokenSecret,
			exp:Date.now() + tokenExp
		})
	} else {
		return {
			status:-1,
			msg:"此用户已经存在"
		}
	}
	
	if(userUpdateResult.id || userUpdateResult.affectedDocs === 1){
		return{
			status:0,
			token,
			msg:"注册成功"
		}
	}
	
	return {
	  status: -1,
	  msg: '注册失败'
	}
}

exports.main = register;