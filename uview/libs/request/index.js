class Request {
	config = {
		baseUrl: '', // 请求的根域名
		// 默认的请求头
		header: {
			'content-type': 'application/json;charset=UTF-8'
		},
		method: 'POST',
		// 设置为json，返回后uni.request会对数据进行一次JSON.parse
		dataType: 'json',
		// 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
		responseType: 'text',
		showLoading: true, // 是否显示请求中的loading
		loadingText: '请求中...',
		loadingTime: 800, // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
		timer: null, // 定时器
	}

	// 判断是否http|https开头的URL
	static isHttp(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
	}

	// 拦截器
	interceptor = {
		// 请求前的拦截
		request: null,
		// 请求后的拦截
		response: null
	}

	// 设置全局默认配置
	setConfig(customConfig) {
		this.config = Object.assign(this.config, customConfig);
	}

	// 主要请求部分
	async request(options = {}) {
		options.dataType = options.dataType || this.config.dataType;
		options.responseType = options.responseType || this.config.responseType;
		options.url = options.url || '';
		options.params = options.params || {};
		options.header = options.header || this.config.header;
		options.method = options.method || this.config.method;
		
		// 检查请求拦截
		if (this.interceptor.request && typeof this.interceptor.request === 'function') {
			let tmpConfig = {};
			let interceptorReuest = this.interceptor.request(options);
			if (interceptorReuest === false) {
				return false;
			}
			this.options = interceptorReuest;
		}

		return new Promise((resolve, reject) => {
			options.complete = (response) => {
				uni.hideLoading();
				clearTimeout(this.config.timer);
				if (response.statusCode == 200) { //成功
					if (this.interceptor.response && typeof this.interceptor.response === 'function') {
						let resInterceptors = this.interceptor.response(response.data);
						if (resInterceptors === false) {
							reject(response.data);
						} else {
							resolve(resInterceptors);
						}
					} else {
						resolve(response.data);
					}
				} else {
					if(response.errMsg) {
						uni.showModal({
							title: response.errMsg
						});
					}
					reject(response)
				}
			}

			// 判断用户传递的URL是否/开头,如果不是,加上/
			options.url = Request.isHttp(options.url) ? options.url : (this.config.baseUrl + (options.url.indexOf('/') == 0 ?
				options.url : '/' + options.url));
			
			// 是否显示loading
			if(this.config.showLoading) {
				this.config.timer = setTimeout(() => {
					uni.showLoading({
						title: this.config.loadingText
					})
				}, this.config.loadingTime);
			}
			uni.request(options)
		})
	}

	constructor() {
		// get请求
		this.get = (url, options = {}) => {
			return this.request({
				method: 'GET',
				url,
				...options
			})
		}

		// post请求
		this.post = (url, data, options = {}) => {
			return this.request({
				url,
				method: 'POST',
				...options,
				data
			})
		}
	}
}

export default new Request
