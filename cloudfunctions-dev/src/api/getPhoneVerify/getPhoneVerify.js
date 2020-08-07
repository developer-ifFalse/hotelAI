/**
 * https://blog.csdn.net/qq_41524691/article/details/103398252
 * 第二种方式实现 阿里云获取验证码
 */

const Core = require('@alicloud/pop-core');
const { randomCode } = require("../../utils/randomCode.js")
const db = uniCloud.database();
async function getPhoneVerify(event) {
	let {
		phoneNum
	} = event;
					
		let client = new Core({
			accessKeyId: 'LTAI4FcTdXEjmi7ytGTFBzcx', //AccessKey管理页面上创建和查看您的AccessKey
			accessKeySecret: 'D0pPDj3EpGdQtLEZqKQM8T812hJhot', //
			endpoint: 'https://dysmsapi.aliyuncs.com',
			apiVersion: '2017-05-25'
		});
		
		let verifyNum = randomCode()
		let params = {
			"RegionId": "cn-hangzhou", //
			"SignName": "途游五子棋", //签名（通常为app名称）
			"TemplateCode": "SMS_183262272", //模版CODE
			"PhoneNumbers": phoneNum,
			"TemplateParam": `{ "code":'${verifyNum}' }`
		}
		
		let requestOption = {
			method: 'POST'
		};
		
		let res = await client.request('SendSms', params, requestOption).then((result) => {
				return {
					status: 1,
					msg: "成功",
					verifyNum
				}
			}, (ex) => {
				return {
					status: -1,
					msg: ex.data.Message
				}
			})
		return res;	
	

};
exports.main = getPhoneVerify;