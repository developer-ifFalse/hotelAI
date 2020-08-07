<template>
	<view>
		<view class="zt-phone-login-con">
			<view>请验证手机号</view>
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
			<view><button type="primary" @tap="login" :disabled="isLogin">确认</button></view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from "vuex"
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
