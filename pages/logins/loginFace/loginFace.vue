<template>
	<view>
		<view class="img-box">
			<view @click="chooseImg">选择照片</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				base64Img: "",
				AccessToken: ""
			}
		},
		methods: {
			base64Coding(path) {
				this.loading()
				let reader;
				plus.io.resolveLocalFileSystemURL(path, (entry) => {
					reader = new plus.io.FileReader();
					reader.onloadend = (e) => { //读取 操作 结束
						let base64 = e.target.result;
						let dataArr = base64.split(',', 3);
						this.base64Img = dataArr[1];
						this.getAccessToken();
						uni.hideLoading()
					}
					reader.readAsDataURL(entry, "UTF-8");
				});
			},

			toast(text, icon) {
				uni.showToast({
					icon: icon || "none",
					title: text
				});
			},
			loading() {
				uni.showLoading({
					title: '正在加载',
					mask: false
				});
			},

			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						if (res.tempFilePaths.length > 0) {
							this.base64Coding(res.tempFilePaths[0])
						}
					},
					fail: () => {
						this.toast("获取照片失败！")
					}
				})
			},

			//获取token
			getAccessToken() {
				this.loading();
				uni.request({
					url: 'https://aip.baidubce.com/oauth/2.0/token',
					method: 'POST',
					data: {
						grant_type: "client_credentials", // 必须参数，固定为
						client_id: "GNSV2W1UOBqsYc1E40kDlZUn", //必须参数，应用的API Key
						client_secret: "gmFED0tgNWBbac3kMoQHmb2svqfGxt7v" //必须参数，应用的Secret Key
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (!res.data.access_token) {
							this.toast("请稍后重试！")
						} else {
							this.AccessToken = res.data.access_token;
							this.faceDetect();
						}
					},
					fail: (err) => {
						this.toast("请稍后重试！")
					}
				});
			},
			//检测上传的图片是否有人脸
			faceDetect() {
				uni.request({
					url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + this.AccessToken,
					method: 'POST',
					data: {
						image: this.base64Img, // 图片信息(总数据大小应小于10M)，图片上传方式根据image_type来判断。
						image_type: 'BASE64'
					},
					success: res => {
						if (res.data.result !== null && res.data.result.face_list[0].face_probability >= 0.8) {
							// 有人脸进行搜索
							this.faceSearch();
						} else if (res.data.result !== null && res.data.result.face_list[0].face_probability < 0.8) {
							uni.hideLoading()
							this.toast("未检测到人脸！")

						} else if (res.data.result === null && res.data.error_code === 222202) {
							uni.hideLoading()
							this.toast("未检测到人脸！")
						} else {
							uni.hideLoading()
							this.toast("未检测到人脸！")
						}
					},
					fail: (err) => {
						uni.hideLoading()
						this.toast("稍后重试！")
					}
				});
			},
			// 人脸搜索
			faceSearch() {
				uni.request({
					url: 'https://aip.baidubce.com/rest/2.0/face/v3/search?access_token=' + this.AccessToken,
					method: 'POST',
					data: {
						image: this.base64Img,
						image_type: 'BASE64',
						group_id_list: "coderzt" //创建的组的ID（在人脸管理里面创建的）					
					},
					success: res => {
						if (res.data.result !== null && res.data.result.user_list[0].score >= 80) {
							uni.showToast({
								title: '登录成功！'
							});
						}
						if (res.data.result !== null && res.data.result.user_list[0].score <= 80) {
							uni.hideLoading()
							this.toast("您未注册，请先注册！")
						}
					},
					fail: () => {
						uni.hideLoading()
						this.toast("稍后重试！")
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.img-box {
		box-sizing: border-box;
		padding: 20rpx 20rpx;

		view {
			text-align: center;
			font-size: 36rpx;
			font-weight: bold;
			height: 120rpx;
			line-height: 120rpx;
			color: #CCCCCC;
			box-shadow: 0 0 18rpx #CCCCCC;
		}
	}
</style>
