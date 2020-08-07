<template>
	<view>
		<view class="zt-register-con">
			<view>欢迎注册 未来酒店</view>
			<view>
				<view @tap="selectRegion">
					+{{ regions[regionsIndex] }}
					<uni-icons type="arrowdown"></uni-icons>
				</view>
				<view>
					<input type="number" v-model="phoneNum" @input="inputVerify" placeholder="请输入手机号" />
				</view>
			</view>
			<view>
				<view v-if="!isShowOrHidePass">
					<input type="password" v-model="password" @input="inputVerify" maxlength="16" placeholder="6~16位(含数字/字母)" />
					<view @tap="showOrHidePass">
						<uni-icons type="eye-slash"></uni-icons>
					</view>
				</view>
				<view v-if="isShowOrHidePass">
					<input type="text" v-model="password" @input="inputVerify" placeholder="请输入密码" />
					<view @tap="showOrHidePass">
						<uni-icons type="eye"></uni-icons>
					</view>
				</view>
			</view>
			<view>
				<input type="number" v-model="verifyNum" @input="inputVerifyNum" placeholder="请输入验证码" />
				<button type="default" :disabled="isGetverifyNum" @tap="getVerifyNum" plain="true" size="mini">{{ checkBtnText }}</button>
			</view>
			<view><button type="primary" @tap="register" :disabled="isLogin">注册并登录</button></view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				isLogin: true,
				checkBtnText:"获取验证码",
				isShowOrHidePass: false,
				isGetverifyNum: true,
				regions: ['86', '852', '853', '886'],
				regionsIndex: 0,
				phoneNum: "",
				password: "",
				verifyNum:"",  //这两个是一样的    输入的
				isVerifyNum:"",//  获取的
				timerIndex:60  //验证码有效时间
			}
		},
		methods: {
			...mapMutations(['USER_LOGIN']),
			showOrHidePass() {
				this.isShowOrHidePass = !this.isShowOrHidePass;
			},
			//判断 账号密码是否为空
			inputVerify() {
				let { verifyNum,phoneNum,password } = this;
				this.isGetverifyNum = (phoneNum !== "" && password !== "") ? false : true;
				this.isLogin = (verifyNum !== "" && phoneNum !== "" && password !== "") ? false : true;
			},
			//判断是否可以登录注册
			inputVerifyNum() {
				let {
					verifyNum,
					phoneNum,
					password
				} = this;
				this.isLogin = (verifyNum !== "" && phoneNum !== "" && password !== "") ? false : true;
			},
			//获取验证码
			getVerifyNum() {
				let { phoneNum,regionsIndex } = this;
				if (!(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
					uni.showModal({
						content: '手机号格式错误',
						showCancel: false
					});
					return false;
				} else {
					this.$cloud.callFunction({
							name:"getPhoneVerify",
							data:{
								phoneNum,
								region:this.regions[regionsIndex]
								
							}
						}).then(res=>{
							if(res.result.status === -1){
								return Promise.reject(new Error(res.result.msg))
							}
							//计时
							// console.log(res);
							this.isVerifyNum = res.result.verifyNum;
							this.verifyTimer();
						}).catch(err=>{
							if(err.message === "触发天级流控Permits:10"){
								uni.showToast({
									icon:"none",
									title: '您已超出限制，请明天重试！',
									duration:2000
								});
							} else if(err.message === "触发天级流控Permits:5"){
								uni.showToast({
									icon:"none",
									title: '您已超出限制，请一小时后重试！',
									duration:2000
								});
							} else {
								uni.showToast({
									icon:"none",
									title: '操作频繁，请稍后重试！',
									duration:2000
								});
							}
						})
						
				}
			},
			//验证码有效时间
			verifyTimer(){
				let timer;
				clearInterval(timer);
				this.isGetverifyNum = true;
				timer = setInterval(()=>{
					this.timerIndex -=1;
					this.checkBtnText = this.timerIndex+"秒后重新获取";
					if(this.timerIndex <= 0){
						this.checkBtnText = "获取验证码";
						this.timerIndex = 60;
						this.phoneNum !== "" ? this.isGetverifyNum = false : true;
						clearInterval(timer);
					}
				},1000)
			},
			selectRegion() {
				uni.showActionSheet({
					itemList: ['中国大陆(+86)', '中国香港(+852)', '中国澳门(853)', '中国台湾(886)'],
					success: (res) => {
						this.regionsIndex = res.tapIndex;
					}
				});
			},
			register() {
				const {
					phoneNum,
					password,
					verifyNum
				} = this;
				let patrn = /^(\w){6,16}$/;

				if (this.password.length < 6) {
					uni.showModal({
						content: '用户名密码长度均不能小于6',
						showCancel: false
					})
					return false;
				}

				if (!patrn.exec(this.password)) {
					uni.showModal({
						content: '密码只能包含字母或者数字',
						showCancel: false
					})
					return false
				}
				
				if(this.timerIndex === 60){
					uni.showToast({
						icon:"none",
						title: '请重新获取验证码！'
					});
					return false;
				}
				
				uni.showLoading({
					title: '注册中...'
				})

				this.$cloud.callFunction({
					name: "register",
					data: {
						phoneNum,
						password,
						verifyNum
					}
				}).then((res) => {
					uni.hideLoading();
					if (res.result.status !== 0) {
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync('token', res.result.token);  //存储token
					this.USER_LOGIN('sigup'); //存储 登录状态 方式
					uni.showModal({
						content: '注册成功，已为你登录!',
						showCancel: false,
						success: res => {
							if (res.confirm) {
								uni.switchTab({
									url: '../../tabBar/index/index'
								})
							}
						}
					});
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: '注册失败，' + err.message,
						showCancel: false
					})
				})

			}

		}
	}
</script>

<style>
	.zt-register-con {
		padding: 20rpx 30rpx;
	}

	.zt-register-con>view:nth-child(1) {
		font-size: 68rpx;
		color: #479bfc;
		text-align: center;
		padding: 60rpx 0;
	}

	.zt-register-con>view:nth-child(2) {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #e0e0e0;
		padding: 40rpx 0;
	}

	.zt-register-con>view:nth-child(2)>view:first-child {
		margin-right: 40rpx;
		font-size: 35rpx;
	}

	.zt-register-con>view:nth-child(3)>view {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #e0e0e0;
		padding: 30rpx 0;
		padding-right: 40rpx;
	}

	.zt-register-con>view:nth-child(3)>view>input {
		margin-right: 20rpx;
		flex: 1;
	}

	.zt-register-con>view:nth-child(4) {
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #e0e0e0;
		padding: 30rpx 0;
	}

	.zt-register-con>view:nth-child(4)>button {}

	.zt-register-con>view:nth-child(5) {
		margin-top: 40rpx;
	}
</style>
