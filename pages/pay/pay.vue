<template>
	<view>
		<view class="pay-header">
			<uni-status-bar></uni-status-bar>
			<view class="pay-nav-bar">
				<view class="back">
					<uni-icons @click="backTo" size="26" color="#fff" type="arrowleft"></uni-icons>
					<text>支付订单</text>
				</view>
			</view>
		</view>
		
		<!-- 详情 -->
		<view class="hotel-detail">
			<view class="hotel-detail-info">
				<view class="hotel-name">
					六点半大酒店
				</view>
				<view class="hotel-specification">
					<view>北欧城景大床房（1间）</view>
					<view>7月7日入住  7月9日离店  共两晚</view>
				</view>
				<view class="hotel-money">
					<view>
						<text>订单金额：</text>
						<text>￥999.00</text>
					</view>
					<view>查看详情</view>
				</view>
				<view class="pay-valid-time">
					<text>剩余支付时间</text>
					<view class="time">
						<text>2</text>
						<text>9</text>
						 : 
						<text>5</text>
						<text>1</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 支付方式 -->
		<view class="pay-way-content">
			<view class="pay-way-info">
				<view class="title">支付方式</view>
				<view class="pay-item">
					<view class="pay-icon_service">
						<view class="icon">
							<image src="../../static/weixin.png"></image>
						</view>
						<view class="name">微信支付</view>
					</view>
					<view class="pay-checkbox">
						<uni-icons size="28" color="#409bff" type="checkbox-filled"></uni-icons>
					</view>
				</view>
				<view class="pay-item">
					<view class="pay-icon_service">
						<view class="icon">
							<image src="../../static/zhifubao.png"></image>
						</view>
						<view class="name">支付宝支付</view>
					</view>
					<view class="pay-checkbox">
						<uni-icons size="28" color="#ccc" type="checkbox"></uni-icons>
					</view>
				</view>
				<view class="pay-item">
					<view class="pay-icon_service">
						<view class="icon">
							<image src="../../static/bank.png"></image>
						</view>
						<view class="name">银行卡支付</view>
					</view>
					<view class="pay-checkbox">
						<uni-icons size="28" color="#ccc" type="checkbox"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		<view class="pay-btn">
			<button type="default" @click="confirmPay">确认支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			backTo(){
				uni.navigateBack({
					delta:1
				})
			},
			confirmPay(){
				uni.navigateTo({
					url:"../confirm-pay/confirm-pay"
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f4f4;
	}
	.pay-btn{
		padding: 40rpx;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		button{
			width: 100%;
			background-color: #ff5555;
			color: #FFFFFF;
		}
	}
	
	.pay-way-content{
		padding: 20rpx;
		.pay-way-info{
			background-color: #FFFFFF;
			border-radius: 20rpx;
			padding: 20rpx;
			.title{
				font-size: 32rpx;
				font-weight: bold;
				padding-bottom:20rpx;
			}
			.pay-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #CCCCCC;
				margin-bottom: 20rpx;
				.pay-icon_service{
					display: flex;
					align-items: center;
					.name{
						margin-left: 20rpx;
						font-size: 32rpx;
						color: #333333;
					}
					.icon{
						image{
							width: 60rpx;
							height: 60rpx;
						}
					}
				}
			}
		}
	}
	
	.pay-header{
		height: 300rpx;
		background-color: #64c2ff;
		.pay-nav-bar{
			padding: 0 20rpx;
			.back{
				display: flex;
				align-items: center;
				color: #FFFFFF;
				font-size: 38rpx;
				text{
					margin-right: 40rpx;
				}
			}
		}
	}
	
	.hotel-detail{
		padding: 0 20rpx;
		margin-top: -80rpx;
		.hotel-detail-info{
			padding: 20rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			.pay-valid-time{
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				background-color: #f8f8f8;
				padding: 20rpx;
				border-radius: 20rpx;
				text{
					color: #bc9669;
				}
				.time{
					margin-left: 40rpx;
					text{
						margin-right: 10rpx;
						padding: 5rpx 15rpx;
						background-color: #bc9669;
						color: #FFFFFF;
					}
				}
			}
			.hotel-name{
				font-size: 36rpx;
				font-weight: bold;
			}
			.hotel-specification{
				border-bottom: 1rpx dashed #CCCCCC;
				margin: 20rpx 0;
				font-size: 26rpx;
				padding-bottom:20rpx;
				color: #3c3c3c;
			}
			.hotel-money{
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 20rpx;
				view{
					&:nth-child(1){
						text{
							&:nth-child(1){
								font-size: 28rpx;
								color: #888888;
								font-weight: bold;
							}
							&:nth-child(2){
								font-size: 28rpx;
								color: #fd5f5f;
								font-weight: bold;
							}
						}
					}
					&:nth-child(2){
						font-size: 24rpx;
						color: #4b96ee;
					}
				}
			}
		}
	}
</style>
