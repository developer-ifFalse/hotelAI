<template>
	<view>
		<view class="header">
			<image src="/static/face.png"></image>
		</view>
		
		<view class="container">
			<view class="input-item">
				<input @click="openCard" disabled="true" v-model="carID"  placeholder="请输入身份证号码"/>
				<u-keyboard :random="true" :cancel-btn="false" @close="close" :show="show" @change="valChange" @backspace="backspace" mode="card"></u-keyboard>
			</view>
			<view class="input-item">
				<input type="text" v-model="username"  placeholder="请输入您的真实姓名"/>
			</view>
			<view class="input-item">
				<input type="text" @click="choseImage" disabled="true" :placeholder="placeholder"/>
			</view>
			<view class="input-item" v-if="carID && username && userImg">
				<button type="primary" :loading="btnLoading" @click="checkIdentity">{{ btnVal }}</button>
			</view>
		</view>
		<!-- <button type="primary" :loading="btnLoading" @click="personVerify">{{ btnVal }}</button> -->
		<!-- 选择房间 -->
	<!-- 	<uni-popup type="top" ref="uniPopup">
			<view class="">
				<image src="../../static/ai.png" mode="widthFix"></image>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show:false,
				carID:"",
				username:"",
				userImg:"",
				placeholder:"请选择自己的免冠照",
				btnLoading:false,
				btnVal:"确认验证身份",
				AccessToken:""
			}
		},
		methods: {
			base64Coding(path) {
				let reader;
				plus.io.resolveLocalFileSystemURL(path, (entry) => {
					reader = new plus.io.FileReader();
					reader.onloadend = (e) => { //读取 操作 结束
						let base64 = e.target.result;
						let dataArr = base64.split(',', 3);
						this.userImg = dataArr[1];
						this.placeholder = "已上传照片"
						// console.log(this.userImg);
					}
					reader.readAsDataURL(entry, "UTF-8");
				});
			},
			openCard(){
				this.show = true;
			},
			valChange(val) {
				this.carID += val;
			},
			close(){
				this.show  = false;
			},
			backspace() {
				if(this.carID.length) this.carID = this.carID.substr(0, this.carID.length - 1);
			},
			choseImage(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						// 对图片 进行base64编码
						this.base64Coding(res.tempFilePaths[0])
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
							this.toast("校验失败，请稍后重试！")
						} else {
							this.AccessToken = res.data.access_token;
							this.faceDetect();  // 检测是否有人脸
						}
					},
					fail: (err) => {
						this.toast("校验失败，请稍后重试！")
					}
				});
			},
			//检测上传的图片是否有人脸
			faceDetect() {
				uni.request({
					url: 'https://aip.baidubce.com/rest/2.0/face/v3/detect?access_token=' + this.AccessToken,
					method: 'POST',
					data: {
						image: this.userImg, // 图片信息(总数据大小应小于10M)，图片上传方式根据image_type来判断。
						image_type: 'BASE64'
					},
					success: res => {
						if (res.data.result !== null && res.data.result.face_list[0].face_probability >= 0.8) {
							// 有人脸进行搜索
							this.personVerify();
						} else if (res.data.result !== null && res.data.result.face_list[0].face_probability < 0.8) {
							uni.hideLoading()
							this.toast("上传的免冠照，未检测到人脸！")
			
						} else if (res.data.result === null && res.data.error_code === 222202) {
							uni.hideLoading()
							this.toast("上传的免冠照，未检测到人脸！")
						} else {
							uni.hideLoading()
							this.toast("上传的免冠照，未检测到人脸！")
						}
					},
					fail: (err) => {
						uni.hideLoading()
						this.toast("校验失败，稍后重试！")
					}
				});
			},
			// 身份验证(由于需要企业认证就跳过此步骤)
			personVerify() {
				uni.showToast({
					title:"办理入住成功"
				})
				this.btnLoading = false;
				this.btnVal = "成功办理"
				uni.navigateTo({
					url: '../select-room/select-room'
				});
				// uni.request({
				// 	url: 'https://aip.baidubce.com/rest/2.0/face/v3/person/verify?access_token=' + this.AccessToken,
				// 	method: 'POST',
				// 	data: {
				// 		image: this.userImg,
				// 		image_type: 'BASE64',
				// 		id_card_number:this.carID, // 身份证号码
				// 		name:this.username,  // 真实姓名
				// 		quality_control:"NORMAL"  // 活体检测（防止图片翻拍，复牌）
				// 	},
				// 	success: res => {
				// 		console.log(res);
				// 	},
				// 	fail: () => {
				// 		uni.hideLoading()
				// 		this.toast("稍后重试！")
				// 	}
				// });
			},
			checkIdentity(){
				if(this.btnLoading) {  /*防止重复点击按钮*/ return false;}
				this.btnLoading = true;
				this.btnVal = "正在校验"
				this.getAccessToken(); // 从获取token开始验证身份
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
			}
		}
	}
</script>

<style lang="scss">
	.header{
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 256rpx;
			height: 256rpx;
		}
	}
	.container{
		padding: 20rpx;
	}
	.input-item{
		border-bottom: 1rpx solid #f4f4f4;
		border-top: 1rpx solid #f4f4f4;
		margin-top: 20rpx;
		input{
			flex: 1;
			height: 80rpx;
			line-height: 80rpx;
		}
	}
</style>
