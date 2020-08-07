<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="gotel-detail-header">
		<!-- 	<view class="header-nav-bar">
				<view class="left-back">
					<uni-icons color="#fff" size="24" type="arrowleft"></uni-icons>
				</view>
				<view class="right-many-nav">
					<uni-icons color="#fff" style="margin-right: 20rpx;" size="24" type="heart"></uni-icons>
					<uni-icons color="#fff" size="24" type="redo"></uni-icons>
				</view>
			</view> -->
			<swiper class="swiper-box" :circular="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/hotel-detail1.jpg"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/hotel-detail2.jpg"></image>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="swiper-item">
						<image src="../../static/hotel-detail3.jpg"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 简介 -->
		<view class="hotel-intro-content">
			<view class="hotel-intro-bg"></view>
			<view class="hotel-intro-info">
				<view class="header">
					<view class="title">六点半酒店</view>
					<view class="type">总统套房</view>
				</view>
				<view class="comment">
					<view class="left-grade">
						<view>4.8</view>
						<view>棒极啦</view>
					</view>
					<view class="right-other">
						<view>夜景美99  地理位置好9999  前台热情 999</view>
						<view>高于99%的同城总统套房 999+条热评</view>
					</view>
				</view>
				<view class="address">
					<view>人民路999号999层</view>
					<view>距离人民地铁站99米，步行约0.5公里7分钟</view>
				</view>
			</view>
		</view>
		
		<!-- 购买详情 -->
		<view class="hotel-buy-detail">
			<view class="hotel-buy-info">
				<view class="live-time">
					<view>
						<text>7月7日</text>
						<text>入住</text>
						<text>7月9日</text>
						<text>离店</text>
					</view>
					<view>
						<text>共两晚</text>
						<uni-icons type="arrowright"></uni-icons>
					</view>
				</view>
				<view class="hotel-label">
					<view class="label">含早餐</view>
					<view class="label">到店付</view>
					<view class="label">免费取消</view>
					<view class="label">含有优惠</view>
					<view class="label">
						<text>筛选</text>
						<uni-icons type="arrowdown"></uni-icons>
					</view>
				</view>
				
				<!-- 购买 -->
				<view class="buy-box">
					<view class="hotel-buy-item" v-for="i in 5" :key="i">
						<view class="pic-intro">
							<image src="../../static/hotel-detail3.jpg" lazy-load></image>
						</view>
						<view class="hotel-buy-detail">
							<view class="hotel-name">六点半酒店</view>
							<view class="hotel-size">99平米 双床</view>
							<view class="hotel-rule">入住当天0点前可免费取消</view>
						</view>
						<view class="hotel-buy-btn">
							<view class="hotel-price">￥999</view>
							<view class="buy">
								<button type="error" size="mini" @click="confirmBuy">在线付</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 准备订单 -->
		<view class="confirm-buy animated fadeInUp" v-if="showBuy">
			<view class="mask" @click="closebuyBox"></view>
			<view class="content">
				<view class="title">请确认居住信息</view>
				<view class="title"><text>重庆市涪陵区</text><uni-icons color="#0055ff" type="checkmarkempty"></uni-icons></view>
				<view class="title"><text>六点半大酒店</text><uni-icons color="#0055ff" type="checkmarkempty"></uni-icons></view>
				<view class="title"><text>7月7日 - 7月9日</text><uni-icons color="#0055ff" type="checkmarkempty"></uni-icons></view>
				<view class="title">居住人姓名</view>
				<view class="title"><text>六点半</text><uni-icons color="#0055ff" type="checkmarkempty"></uni-icons></view>
				<view class="progress">
					<view class="progress-in-bg" :style="{width:progressW+'%'}" >
						<view class="progress-in-img">
							<image src="../../static/progress.png"></image>
						</view>
					</view>
				</view>
				<view class="title">正在提交信息，请稍后……</view>
			</view>
		</view>
	</view>
</template>

<script>
	let timer;
	export default {
		data() {
			return {
				showBuy:false,
				progressW:0,
			}
		},
		onNavigationBarButtonTap(e){
			if(e.index === 0){
				console.log("点了分享");
			}
			if(e.index=== 1){
				console.log("点了heart");
			}
		},
		methods: {
			confirmBuy(){
				this.showBuy = true;
				this.progressW = 0;
				clearInterval(timer)
				this.progressMove();
			},
			closebuyBox(){
				this.showBuy = false;
			},
			progressMove(){
				timer = setInterval(()=>{
					this.progressW += 5;
					if(this.progressW >= 100){
						clearInterval(timer);
						this.showBuy = false;
						uni.navigateTo({
							url:"../pay/pay"
						})
					}
				},500)
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f1f1f1;
	}
	
	.confirm-buy{
		animation-duration: 0.3s;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9998;
		.mask{
			position: fixed;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,0.5);
			z-index: 9999;
		}
		.content{
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%);
			z-index: 10000;
			width: 90%;
			border-radius: 20rpx;
			background-color: #fff;
			padding: 40rpx;
			box-sizing: border-box;
			.progress{
				height: 20rpx;
				background-color: #f4f4f4;
				position: relative;
				border-radius: 20rpx;
				.progress-in-bg{
					position: absolute;
					left: 0;
					height: 100%;
					width: 10%;
					border-radius: 20rpx;
					background-color: #0055ff;
					.progress-in-img{
						position: absolute; 
						right: -5rpx;
						top: -10rpx;
						width: 40rpx;
						height: 40rpx;
						image{
							width: 40rpx;
							height: 40rpx;
						}
					}
				}
			}
			view{
				margin-bottom: 10rpx;
				&:nth-child(1),
				&:nth-child(5),
				&:nth-child(8){
					font-size: 28rpx;
					color: #d1d1d1;
					font-weight: bold;
				}
				&:nth-child(8){
					text-align: center;
					padding: 20rpx 0;
				}
				&:nth-child(2),
				&:nth-child(3),
				&:nth-child(4),
				&:nth-child(6){
					text{
						font-size: 32rpx;
						color: #505050;
						font-weight: bold;
					}
				}
			}
			.title{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
		}
	}
	
	.gotel-detail-header{
		height: 400rpx;
		position: relative;
		.swiper-box{
			height: 400rpx;
			.swiper-item{
				image{
					width: 100%;
				}
			}
		}
		.header-nav-bar{
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			padding: 0 20rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 2;
			.right-many-nav{
				display: flex;
				align-items: center;
			}
		}
	}
	
	.hotel-intro-content{
		padding: 20rpx;
		margin-top: -80rpx;
		position: relative;
		z-index: 9;
		.hotel-intro-bg{
			background: rgba(255,255,255,0.5);
			filter: blur(3px);
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 10;
		}
		.hotel-intro-info{
			z-index: 11;
			position: relative;
			padding: 20rpx;
			border-radius: 20rpx;
			background-color: #FFFFFF;
			.header{
				display: flex;
				align-items: center;
				.title{
					color: #000000;
					font-size: 42rpx;
					font-weight: bold;
					margin-right: 10rpx;
				}
				.type{
					color: #9e9e9e;
					font-size: 32rpx;
				}
			}
			.comment{
				display: flex;
				align-items: center;
				padding: 20rpx;
				border-radius: 20rpx;
				background-color: #eff6ff;
				margin: 20rpx 0;
				.left-grade{
					border-right: 1rpx solid #007AFF;
					color: #4fa1fe;
					padding-right: 20rpx;
					text-align: center;
					font-weight: bold;
					view{
						padding: 0;
						&:nth-child(1){
							font-size: 52rpx;
						}
						&:nth-child(2){
							font-size: 38rpx;
						}
					}
				}
				.right-other{
					padding-left: 20rpx;
					view{
						&:nth-child(1){
							color: #4fa1fe;
							font-size: 28rpx;
							font-weight: bold;
							margin-bottom: 20rpx;
						}
						&:nth-child(2){
							font-size: 26rpx;
							color: #a0a5a9;
							font-weight: bold;
						}
					}
				}

			}
			.address{
				view{
					&:nth-child(1){
						font-size: 32rpx;
						font-weight: bold;
						color: #333333;
					}
					&:nth-child(2){
						font-size: 26rpx;
						color: #898989;
					}
				}
			}
		}
	}
	
	.hotel-buy-detail{
		background-color: #fff;
		padding: 20rpx;
		.buy-box{
			margin-top: 20rpx;
			.hotel-buy-item{
				background-color: #FFFFFF;
				border-bottom: 1rpx solid #CCCCCC;
				display: flex;
				margin-bottom: 20rpx;
				.pic-intro{
					image{
						border-radius: 20rpx;
						width: 180rpx;
						height: 280rpx;
					}
				}
				.hotel-buy-detail{
					flex: 1;
					.hotel-name{
						font-size: 46rpx;
						font-weight: bold;
					}
					.hotel-size{
						font-size: 30rpx;
						color: #888888;
					}
					.hotel-rule{
						font-size: 30rpx;
						color: #4ec5a4;
					}
				}
				.hotel-buy-btn{
					text-align: center;
					margin-top: 60rpx;
					.hotel-price{
						font-size: 48rpx;
						color: #ff5554;
					}
					.buy{
						button{
							background-color: #ff5554 !important;
							color: #FFFFFF;
						}
					}
				}
			}
		}
		
		.hotel-buy-info{
			.live-time{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 20rpx;
				border-radius: 20rpx;
				background-color: #fafafa;
				margin-bottom: 20rpx;
				view{
					&:nth-child(1){
						text{
							margin-right: 20rpx;
							&:nth-child(1),
							&:nth-child(3){
								font-size: 38rpx;
								color: #4898f7;
							}
							&:nth-child(2),
							&:nth-child(4){
								font-size: 26rpx;
								color: #888888;
							}
						}
					}
					&:nth-child(2){
						text{
							font-size: 28rpx;
						}
					}
					
				}
				
			}
			.hotel-label{
				display: flex;
				align-items: center;
				justify-content: space-around;
				.label{
					height: 60rpx;
					line-height: 60rpx;
					padding: 0 20rpx;
					background-color: #f8f8f8;
					border-radius: 30rpx;
				}
			}
		}
		
	}
</style>
