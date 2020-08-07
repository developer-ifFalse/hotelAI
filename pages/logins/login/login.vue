<template>
	<view class="login-bg">
		<view class="zt-login-info">
			<view class="zt-log"></view>
			<view class="zt-login-btn" hover-class="zt-active-MP" style="background-color: #05C160;color: #FFFFFF;" @tap="loginWay('weixin')">
				<uni-icons type="weixin" style="color: #FFFFFF;font-size: 45rpx;"></uni-icons>微信登录
			</view>
			<view class="zt-login-btn" hover-class="zt-active" @tap="loginWay('phone')">手机号登录</view>
			<view class="zt-login-btn" hover-class="zt-active" @tap="loginWay('zhanghao')">账号登录</view>
			<view class="zt-login-btn" hover-class="zt-active" @tap="loginWay('loginFace')">人脸登录</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from "vuex";
	export default {
		data() {
			return {

			}
		},
		methods: {
			...mapMutations(["USER_LOGIN"]),
			loginWay(index) {
				switch (index) {
					case 'weixin':
						this.loginMP();
						break;
					case 'phone':
						uni.navigateTo({
							url: '../phone/phone'
						});
						break;
					case 'zhanghao':
						uni.navigateTo({
							url: '../sigin-login/sigin-login'
						});
						break;
					case 'loginFace':
						uni.navigateTo({
							url: '../loginFace/loginFace'
						});
						break;
					default:
						break;

				}
			},
			loginMP() {
				//微信登录
				uni.login({
				  provider: 'weixin',
				  success: (loginRes) => {
					  uni.showLoading({
					  	title: '正在登录……',
					  	mask: false
					  });
					  this.$cloud.callFunction({
						  name:"wxlogin",
						  data:{
							  openid:loginRes.authResult.openid
						  }
					  }).then(res=>{
						  uni.hideLoading();
						  if(res.result.status !== 1){
							  return Promise.reject(new Error(res.result.msg))
						  }
						 uni.setStorageSync("token",res.result.token)
						 this.USER_LOGIN('weixin');
						 uni.switchTab({
						 	url:"../../tabBar/index/index"
						 })
					  }).catch(err=>{
						 uni.hideLoading();
						 uni.showToast({
							 icon:"none",
						 	title: '请稍后重试！'
						 });
					  })
				   
				  }
				});		
			}
		}
	}
</script>

<style scoped>
	.login-bg{
		background: url("../../../static/bg.jpg") 0 0 no-repeat;
		background-size: cover;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: -111;
	}
	.zt-login-info {
		margin-top: 50%;
	}

	.zt-active {
		background: #05c160;
		color: #FFFFFF;
	}

	.zt-login-btn {
		margin: auto;
		height: 100rpx;
		line-height: 100rpx;
		width: 600rpx;
		border-radius: 50rpx;
		border: 1px solid #FFFFFF;
		color: #FFFFFF;
		text-align: center;
		font-size: 35rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
</style>
