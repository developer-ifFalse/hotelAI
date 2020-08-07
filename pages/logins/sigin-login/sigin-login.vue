<template>
	<view>
		<view class="zt-sigin-login-con">
			<view>欢迎来到 未来酒店</view>
			<view>
				<input type="number" v-model="phoneNum" @input="inputUserNum" placeholder="请输入手机号" />
			</view>
			<view>
				<view v-if="!isShowOrHidePass">
					<input type="password" v-model="password" @input="inputPass" placeholder="请输入密码"/>
					<view @tap="showOrHidePass"><uni-icons type="eye-slash"></uni-icons></view>
				</view>
				<view v-if="isShowOrHidePass">
					<input type="text" v-model="password" @input="inputPass" placeholder="请输入密码"/>
					<view @tap="showOrHidePass"><uni-icons type="eye"></uni-icons></view>
				</view>
			</view>
			<view><button type="primary" @tap="login" :disabled="isLogin">登录</button></view>
			<view >
				<view @tap="findPass">忘记密码</view>
				<view @tap="verfiyLogin">验证码登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState,mapMutations } from "vuex"
	export default {
		data() {
			return {
				isLogin:true,
				isShowOrHidePass:false,//0不可见  ，1可见
				password:"",
				phoneNum:""
			}
		},
		onNavigationBarButtonTap(ev){
			if(ev.index === 0){
				uni.navigateTo({
					url: '../register/register'
				});
			}
		},
		methods: {
			...mapMutations(['USER_LOGIN']),
			showOrHidePass(){
				this.isShowOrHidePass = !this.isShowOrHidePass;
			},
			inputUserNum(){
				this.checkInput()
			},
			inputPass(){
				this.checkInput()
			},
			checkInput(){  //判断是否 输入账号密码
			this.isLogin = this.phoneNum !== "" && this.password !== "" ? false : true;
			},
			findPass(){
				
			},
			verfiyLogin(){
				uni.navigateTo({
					url: '../phone/phone'
				});
			},
			login(){  //登录
				const {
					password,
					phoneNum
				} = this
				
				if (!(/^1[3456789]\d{9}$/.test(this.phoneNum))) {
					uni.showModal({
						content: '手机号格式错误',
						showCancel: false
					});
					return false;
				} 
				
				let patrn = /^(\w){6,16}$/;
				if (!patrn.test(this.password)) {
					uni.showModal({
						content: '密码包含非法字符',
						showCancel: false
					})
					return false
				}
				
				uni.showLoading({
					title: '登录中....',
				});
				
				this.$cloud.callFunction({
					name:"login",
					data:{
						password,
						phoneNum
					}
				}).then(res=>{
					uni.hideLoading();
					if(res.result.status !== 1){
						return Promise.reject(new Error(res.result.msg))
					}
					uni.setStorageSync("token",res.result.token)
					this.USER_LOGIN('sigup');
					uni.switchTab({
						url:"../../tabBar/index/index"
					})
				}).catch(err=>{ 
					uni.hideLoading();
					uni.showModal({
						content: '登录失败,'+err.message,
						showCancel: false
					});
				})
			}
		}
	}
</script>

<style>
	.zt-sigin-login-con{
		padding: 20rpx 30rpx;
	}
	.zt-sigin-login-con>view:nth-child(1){
		font-size: 68rpx;
		color: #479bfc;
		text-align: center;
		padding: 60rpx 0;
	}
	.zt-sigin-login-con>view:nth-child(2){
		border-bottom: 1rpx solid #e0e0e0;
		padding: 40rpx 0;
	}
	
	.zt-sigin-login-con>view:nth-child(3)>view{
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #e0e0e0;
		padding:30rpx 0;
		padding-right: 40rpx;
	}
	.zt-sigin-login-con>view:nth-child(3)>view>input{
		margin-right: 20rpx;
		flex: 1;
	}
	.zt-sigin-login-con>view:nth-child(4){
		margin-top: 80rpx;
	}
	.zt-sigin-login-con>view:nth-child(5){
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;
		font-weight: bold;
		color: #a6a6a6;
		
	}
</style>
