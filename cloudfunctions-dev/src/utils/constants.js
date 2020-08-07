// const loginConfig = {
//   AppId: 'wx00c5442b09058a1a', //微信小程序AppId
//   AppSecret: 'dc0e8a80afadb472f08d2fd97dbffeb1' //微信小程序AppSecret
// }


//短信登录配置(阿里云)
const phoneloginConfig = {
	accessKeyId: 'LTAI4FcTdXEjmi7ytGTFBzcx',   //AccessKey管理页面上创建和查看您的AccessKey
	accessKeySecret: 'D0pPDj3EpGdQtLEZqKQM8T812hJhot',  //
	endpoint: 'https://dysmsapi.aliyuncs.com',
	apiVersion: '2017-05-25',
	RegionId: "cn-hangzhou",  //
	SignName: "途游五子棋",  //签名（通常为app名称）
	TemplateCode: "SMS_183262272" //模版CODE
}

const passSecret = 'coderztniubihhhh' //用于用户数据库密码加密的密钥，使用一个比较长的随机字符串即可

const tokenExp = 7200000   //token过期时间

module.exports = {
  //loginConfig,
  passSecret,
  tokenExp,
  phoneloginConfig
}
