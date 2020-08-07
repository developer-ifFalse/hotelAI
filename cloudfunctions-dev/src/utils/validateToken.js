const jwt = require('jwt-simple')

const db = uniCloud.database()
async function validateToken(token) {
	// token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiIxMTExMTExMSJ9.tAd9obYupVUH8nhqN5JsolS7vNWQwbMa9XG4quJgo2o";
	// token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiJvUnJkUXR4Tnl4S0lxS3NhZ3FYRWJLZVNWekJjIn0.M6lqn2U1SQSyVLqg-xYKeaBfykFF4rkYXcpEBV5RvB4"
  const userFromToken = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  
  console.log(userFromToken); // { userId:'88888' }

  const userInDB = await db.collection('user').where(userFromToken).get()
 
  if (userInDB.data.length !== 1) {
    return {
      status: -1,
      errCode: 'TOKEN_INVALID',
      msg: '查无此人'
    }
  }
   
  const userInfoDB = userInDB.data[0]
  
  let userInfoDecode
 
  userInfoDecode = jwt.decode(token, userInfoDB.tokenSecret)  //使用存储得密钥对token解码{ id：xxxx }
 

  function checkUser(userFromToken, userInfoDB) {
    return Object.keys(userFromToken).every(function(item) {
      return userFromToken[item] === userInfoDB[item] && userFromToken[item] === userInfoDecode[item]
    })
  }

	//判断 token是否过期  有效期为7200000毫秒 
  if (userInfoDB.exp > Date.now() && checkUser(userFromToken, userInfoDB)) {
    return {
      statue: 0,
      openid: userInfoDB.openid,
      userId: userInfoDB.userId,
      msg: 'token验证成功'
    }
  }

  if (userInfoDB.exp < Date.now()) {
    return {
      status: -3,
      errCode: 'TOKEN_EXPIRED',
      msg: 'token已失效'
    }
  }

  return {
    status: -2,
    errCode: 'TOKEN_INVALID',
    msg: 'token无效'
  }

}

module.exports = {
  validateToken
}
