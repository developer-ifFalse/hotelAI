'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var popCore = _interopDefault(require('@alicloud/pop-core'));

//生成随机数

function randomCode() {
		let codeStr = "";
		for (var i = 0; i < 6; i++) {
			let code = Math.floor(Math.random() * 10);
			codeStr += code;
		}
		return codeStr;
	}
	
var randomCode_1 = {
	randomCode
};

/**
 * https://blog.csdn.net/qq_41524691/article/details/103398252
 * 第二种方式实现 阿里云获取验证码
 */


const { randomCode: randomCode$1 } = randomCode_1;
const db = uniCloud.database();
async function getPhoneVerify(event) {
	let {
		phoneNum
	} = event;
					
		let client = new popCore({
			accessKeyId: 'LTAI4FcTdXEjmi7ytGTFBzcx', //AccessKey管理页面上创建和查看您的AccessKey
			accessKeySecret: 'D0pPDj3EpGdQtLEZqKQM8T812hJhot', //
			endpoint: 'https://dysmsapi.aliyuncs.com',
			apiVersion: '2017-05-25'
		});
		
		let verifyNum = randomCode$1();
		let params = {
			"RegionId": "cn-hangzhou", //
			"SignName": "途游五子棋", //签名（通常为app名称）
			"TemplateCode": "SMS_183262272", //模版CODE
			"PhoneNumbers": phoneNum,
			"TemplateParam": `{ "code":'${verifyNum}' }`
		};
		
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
			});
		return res;	
	

}var main = getPhoneVerify;

var getPhoneVerify_1 = {
	main: main
};

exports.default = getPhoneVerify_1;
exports.main = main;
