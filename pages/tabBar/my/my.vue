<template>
	<view>
		<view class="my-top-container">
			<!-- 状态栏 -->
			<uni-status-bar></uni-status-bar>
			<!-- 导航栏 -->
			<view class="zt-nav-bar">
				<view class="left">
					<view class="icon iconfont icon-qiandao"></view>
					<view>签到赚里程</view>
				</view>
				<view class="right">
					<view class="icon iconfont icon-btn_scan"></view>
					<view class="icon iconfont icon-shezhi"></view>
					<view class="icon iconfont icon-wode"></view>
				</view>
			</view>
			<view class="zt-login-container">
				<!-- 未登录状态 -->
				<view class="noLogin" v-if="!hasLogin">
					<view class="login-btn" hover-class="hoverClass" @tap="login">登录/注册</view>
					<view style="padding:20rpx 0;">登录有金喜</view>
				</view>
				<!-- 登录状态 -->
				<view class="yesLogin" v-if="hasLogin">
					<view class="avatar">
						<image src="../../../static/logo.png" lazy-load></image>
					</view>
					<view class="userInfo">
						<view class="username">
							尊敬的会员
							<view class="icon iconfont icon-bianji"></view>
						</view>
						<view class="user-biaoqian">
							<view>普通会员</view>
							<view>实名认证</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 未登录 我的订单 -->
			<view class="my-dingdan">
				<view>
					<view>
						<view>我的订单</view>
						<view class="icon iconfont icon-weimingmingwenjianjia_jiantou"></view>
					</view>
					<view>
						<view>
							<view class="icon iconfont icon-daifukuan"></view>
							待付款
						</view>
						<view @click="trip">
							<view class="icon iconfont icon-shizhong"></view>
							未出行
						</view>
						<view>
							<view class="icon iconfont icon-icon_huabanfuben"></view>
							待点评
						</view>
						<view>
							<view class="icon iconfont icon-weibiaoti51"></view>
							退赔款/转让
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-info-container">
			<!-- 四个选项按钮 -->
			<view class="many-options">
				<view>
					<view class="icon iconfont icon-qianbao"></view>
					<view>我的钱包</view>
					<view>余额0元</view>
				</view>
				<view>
					<view class="icon iconfont icon-hongbao"></view>
					<view>我的红包</view>
					<view>100个</view>
				</view>
				<view>
					<view class="icon iconfont icon-weibiaoti5"></view>
					<view>投资理财</view>
					<view>手艺好</view>
				</view>
				<view>
					<view class="icon iconfont icon-weibiaoti51"></view>
					<view>现金借贷</view>
					<view>最高20万</view>
				</view>
			</view>
			<!-- 列表 -->
			<view class="options-lists">
				<uni-list>
					<uni-list-item title="领卷中心"></uni-list-item>
					<uni-list-item title="我的收藏"></uni-list-item>
					<uni-list-item title="浏览历史"></uni-list-item>
					<uni-list-item title="发票服务"></uni-list-item>
					<uni-list-item title="我的点评"></uni-list-item>
					<uni-list-item title="常用信息"></uni-list-item>
				</uni-list>
			</view>
			
			<!-- 轮播图 -->
			<view class="zt-swiper">
				<swiper style="height: 200rpx;" :indicator-dots="true" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item"><image src="../../../static/swiper/swiper1.jpg" mode="widthFix" lazy-load></image></view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item"><image src="../../../static/swiper/swiper2.jpg" mode="widthFix" lazy-load></image></view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item"><image src="../../../static/swiper/swiper3.jpg" mode="widthFix" lazy-load></image></view>
					</swiper-item>
				</swiper>
			</view>
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
		computed:{
			...mapState(['hasLogin'])
		},
		methods: {
			login(){
				uni.navigateTo({
					url: '../../logins/login/login'
				});
			},
			trip(){
				uni.navigateTo({
					url:"../../hotel-order/hotel-order"
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #f4f4f4;
	}
	.my-top-container{
		width: 100%;
		height: 500rpx;
		background-color: #4ec5ee;
	}
	.zt-nav-bar{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}
	.zt-nav-bar>view:nth-child(1){
		display: flex;
		align-items: center;
		color: #FFFFFF;
		font-size: 42rpx;
	}
	.zt-nav-bar>view:nth-child(1)>view:nth-child(2){
		font-size: 24rpx;
		margin-left: 10rpx;
	}
	.zt-nav-bar>view:nth-child(2){
		display: flex;
		align-items: center;
	}
	.zt-nav-bar>view:nth-child(2)>view{
		margin-left: 30rpx;
		color: #FFFFFF;
		font-size: 42rpx;
	}
	
	/* 登录 */
	.zt-login-container{
		margin-top: 60rpx;	
		color: #FFFFFF;
		text-align: center;
		height: 200rpx;
	}
	.hoverClass{
		background-color: #CCCCCC;
	}
	.zt-login-container .noLogin>.login-btn{
		background: #7fd1f4;
		width: 400rpx;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 20rpx;
		margin: auto;
		font-size: 32rpx;
	}
	
	.zt-login-container .yesLogin{
		display: flex;
		align-items: center;
	}
	.zt-login-container .avatar>image{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-left: 40rpx;
		margin-right: 40rpx;
	}
	.zt-login-container .userInfo>view:first-child{
		display: flex;
		align-items: center;
		font-size: 42rpx;
		color: #FFFFFF;
	}
	.zt-login-container .userInfo>view:last-child{
		display: flex;
	}
	.zt-login-container .user-biaoqian{
		display: flex;
	}
	.zt-login-container .user-biaoqian>view{
		background: rgba(0,0,0,0.1);
		padding: 5rpx 20rpx;
		color: #FFFFFF;
		font-size: 24rpx;
		margin-right: 20rpx;
		border-radius: 40rpx;
	}
	
	
	.my-dingdan{
		box-sizing: border-box;
		padding: 0 20rpx;
		width: 100%;
		margin-top: 30rpx;
	}
	.my-dingdan>view{
		background: #FFFFFF;
		border-radius: 30rpx;
		padding: 30rpx 0;
	}
	.my-dingdan>view>view:nth-child(1){
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		font-weight: bold;
		padding: 0 20rpx;
	}
	.my-dingdan>view>view:nth-child(2){
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
	}
	.my-dingdan>view>view:nth-child(2) .iconfont{
		font-size: 70rpx;
		color: #6bccff;
		height: 100rpx;
	}
	
	/* 主要内容 */
	.my-info-container{
		margin-top: 240rpx;
		background-color: #f4f4f4;
		padding: 0 20rpx;
	}
	.my-info-container .many-options{
		display: flex;
		justify-content: space-around;
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 30rpx 40rpx;
		text-align: center;
	}
	.my-info-container .many-options view:nth-child(1){
		font-size: 70rpx;
		color: #576a95;
		height: 120rpx;
	}
	.my-info-container .many-options view:nth-child(2){
		font-size: 30rpx; 
		color: #333333;
	}
	.my-info-container .many-options view:nth-child(3){
		font-size: 24rpx;
		color: #b4b4b4;
	}
	
	.options-lists{
		margin-top: 30rpx;
		border-radius: 30rpx;
	}
	.zt-swiper{
		margin-top: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
	}
	.swiper-item{
		border-radius: 30rpx;
	}
	.swiper-item>image{
		/* border-radius: 30rpx; */
		width: 100%;
	}
</style>
