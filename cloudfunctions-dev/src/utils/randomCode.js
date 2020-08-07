//生成随机数

function randomCode() {
		let codeStr = ""
		for (var i = 0; i < 6; i++) {
			let code = Math.floor(Math.random() * 10);
			codeStr += code;
		}
		return codeStr;
	}
	
module.exports = {
	randomCode
};