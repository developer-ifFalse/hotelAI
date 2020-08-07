<template>
	<view>
		<view class="zt-phone-login-con">
			<view>欢迎来到 未来酒店</view>
			<view>
				<view @tap="selectRegion">
					+{{ regions[regionsIndex] }}
					<uni-icons type="arrowdown"></uni-icons>
				</view>
				<view>
					<input type="number" v-model="phoneNum" @input="inputPhoneNum" placeholder="请输入手机号" />
				</view>
			</view>
			<view>
				<input type="number" v-model="verifyNum" @input="inputVerifyNum" placeholder="请输入验证码"/>
				<button type="default" :disabled="isGetverifyNum" @tap="getVerifyNum" plain="true" size="mini">{{ checkBtnText }}</button>
			</view>
			<view><button type="primary" @tap="login" :disabled="isLogin">登录</button></view>
			<view @tap="siginLogin">账号密码登录</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
	export default {
		data() {
			return {
				regions:['86', '852', '853','886'],
				checkBtnText:"获取验证码",
				regionsIndex:0,
				phoneNum:"",
				verifyNum:"",  //这两个是一样的    输入的
				isVerifyNum:"",  //  获取的
				isGetverifyNum:true,
				isLogin:true,
				timerIndex:60  //验证码有效时间
			}
		},
		computed:{
			...mapState(['hasLogin'])
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
			inputPhoneNum(ev){
				this.isGetverifyNum = this.phoneNum !== "" ? false : true;
				this.isLogin = this.verifyNum !== "" && this.phoneNum !== "" ? false : true;
			},
			inputVerifyNum(ev){ 
				this.isLogin = this.verifyNum !== "" && this.phoneNum !== "" ? false : true;
			},
			//获取验证码
		   getVerifyNum(){
			   let { phoneNum,regionsIndex } = this;
				 if(!(/^1[3456789]\d{9}$/.test(phoneNum))){ 
				       uni.showModal({
				           content: '手机号格式错误',
						   showCancel:false
				       });
				        return false; 
				} else{
					//获取验证码
				this.$cloud.callFunction({
						name:"getPhoneVerify",
						data:{
							phoneNum,
							region:this.regions[regionsIndex]
							
						}
					}).then(res=>{
						if(res.result.status === -1){
							console.log(res);
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
			login(){
				//登录
				if(this.verifyNum !== this.isVerifyNum){
					uni.showToast({
						icon:"none",
						title: '验证码错误'
					});
					return false;
				}
				if(this.timerIndex === 60){
					uni.showToast({
						icon:"none",
						title: '请重新获取验证码！'
					});
					return false;
				}
				this.$cloud.callFunction({
					name:"phonelogin",
					data:{
						phoneNum:this.phoneNum
					}
				}).then(res=>{
					if(res.result.status !== 1){
						return Promise.reject(new Error(res.result.msg));
					}
					//
					uni.setStorageSync("token",res.result.token);
					this.USER_LOGIN('phone');
					uni.switchTab({
						url:"../../tabBar/index/index"
					});
				}).catch(err=>{
					uni.showToast({
						icon:"none",
						title: err.message
					});
				})
			},
			//地区信息
			selectRegion(){
				uni.showActionSheet({
				    itemList: ['中国大陆(+86)', '中国香港(+852)', '中国澳门(853)','中国台湾(886)'],
				    success: (res) => {
						this.regionsIndex = res.tapIndex;
				    }
				});
			},
			siginLogin(){
				uni.navigateTo({
					url: '../sigin-login/sigin-login'
				});
			}
			
		}
	}
</script>

<style scoped>
	.zt-phone-login-con{
		padding: 20rpx 30rpx;
	}
	.zt-phone-login-con>view:nth-child(1){
		font-size: 68rpx;
		color: #479bfc;
		text-align: center;
		padding: 60rpx 0;
	}
	.zt-phone-login-con>view:nth-child(2){
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #e0e0e0;
		padding: 40rpx 0;
	}
	.zt-phone-login-con>view:nth-child(2)>view:first-child{
		margin-right: 40rpx;
		font-size: 35rpx;
	}
	.zt-phone-login-con>view:nth-child(3){
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #e0e0e0;
		padding:30rpx 0;
		
	}
	.zt-phone-login-con>view:nth-child(3)>button{
		
	}
	.zt-phone-login-con>view:nth-child(4){
		margin-top: 80rpx;
	}
	
	
	.zt-phone-login-con>view:nth-child(5){
		text-align: right;
		margin-top: 40rpx;
		font-weight: bold;
		color: #a6a6a6;
		
	}
</style>
