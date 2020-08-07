<template>
	<view>
		<view class="search-header">
			<uni-status-bar></uni-status-bar>
			<view class="search-box">
				<view class="left">
					<uni-icons @click="backTo" size="28" type="arrowleft"></uni-icons>
				</view>
				<view class="center">
					<view class="address">重庆</view>
					<view class="search-input">
						<input type="text" placeholder="地点/品牌/酒店" />
					</view>
				</view>
				<view class="right">
					<uni-icons size="28" type="map-pin-ellipse"></uni-icons>
				</view>
			</view>
			
			<view class="center-nav-bar">
				<view class="nav-item">
					<text>智能排序</text>
					<uni-icons size="12" type="arrowdown"></uni-icons>
				</view>
				<view class="nav-item">
					<text>星级价格</text>
					<uni-icons size="12" type="arrowdown"></uni-icons>
				</view>
				<view class="nav-item">
					<text>区域位置</text>
					<uni-icons size="12" type="arrowdown"></uni-icons>
				</view>
				<view class="nav-item">
					<text>筛选</text>
					<uni-icons size="12" type="arrowdown"></uni-icons>
				</view>
			</view>
			
			<view class="bootom-nav-bar">
				<view class="nav-item">
					<text>安心房</text>
				</view>
				<view class="nav-item">
					<text>钟点房</text>
				</view>
				<view class="nav-item">
					<text>品牌</text>
				</view>
				<view class="nav-item">
					<text>4.5分以上</text>
				</view>
				<view class="nav-item">
					<text>免费取消</text>
				</view>
			</view>
		</view>
		
		<!--列表 -->
		<view class="hotel-data-list">
			<view class="hotel-item-list" v-for="i in 10" :key="i" @click="goToHotelDetail">
				<view class="item-left">
					<image src="../../static/bg.jpg" lazy-load></image>
				</view>
				<view class="item-right">
					<view class="item-right-1 item-right-info">
						<view class="hotel-name">六点半酒店</view>
						<view class="hotel-type">总统套房</view>
					</view>
					<view class="item-right-2 item-right-info">
						<view class="hotel-grade">4.8分</view>
						<view class="hotel-grade-other">环境美·都美</view>
					</view>
					<view class="item-right-3 item-right-info">
						<view class="hotel-distance">距离您0.8公里 | 靠近朝天门</view>
					</view>
					<view class="item-right-4 item-right-info">
						<view class="recomend">商务出行</view>
						<view class="recomend">地铁周边</view>
					</view>
					<view class="item-right-5 item-right-info">
						<view class="hotel-brand">六点半集团下品牌</view>
					</view>
					<view class="item-right-6 item-right-info">
						<view class="hotel-status">最新预定5小时前</view>
						<view class="hotel-price">￥299起</view>
					</view>
				</view>
			</view>
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
			goToHotelDetail(){
				uni.navigateTo({
					url: '../hotel-detail/hotel-detail'
				});
			}
		}
	}
</script>

<style lang="scss">
	.search-header{
		height: 420rpx;
		background: url(../../static/bg.jpg) 0 0 no-repeat;
		background-size: cover;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 3;
		.search-box{
			padding: 20rpx 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.center{
				flex: 1;
				display: flex;
				justify-content: space-between;
				background-color: $uni-bg-color;
				padding: 20rpx;
				margin: 0 20rpx;
				
				.search-input{
					flex: 1;
				}
				.address{
					margin-right: 20rpx;
					color: #b2d7fd;
					padding-right: 20rpx;
					border-right: 1rpx solid #CCCCCC;
				}
			}
		}
	}
	
	.center-nav-bar{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		border-bottom: 1rpx solid #CCCCCC;
		.nav-item{
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				font-size: 28rpx;
				font-weight: bold;
			}
		}
	}
	
	.bootom-nav-bar{
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		padding: 20rpx 0;
		.nav-item{
			text-align: center;
			height: 60rpx;
			line-height: 60rpx;
			background-color: #f6f6f6;
			padding: 0 20rpx;
			border-radius: 10rpx;
			text{
				font-size: 28rpx;
				color: 9#afafaf;
			}
		}
	}
	
	.hotel-data-list{
		margin-top: 420rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		.hotel-item-list{
			display: flex;
			padding:10rpx 0;
			border-bottom: 1rpx solid #CCCCCC;
			
			.item-left{
				image{
					width: 220rpx;
					height: 360rpx;
					z-index: 2;
				}
			}
			.item-right{
				flex: 1;
				.item-right-info{
					display: flex;
					align-items: center;
					margin-left: 20rpx;
					flex: 1;
					margin-bottom: 10rpx;
					.hotel-name{
						font-size: 38rpx;
						font-weight: bold;
					}
					.hotel-type{
						font-size: 28rpx;
						color: #CCCCCC;
						margin-left: 10rpx;
					}
					.hotel-grade{
						font-size: 32rpx;
						color: #6db2ff;
						font-weight: bold;
					}
					.hotel-grade-other{
						font-size: 28rpx;
						color: #6db2ff;
						margin-left: 20rpx;
					}
					.hotel-distance{
						font-size: 28rpx;
						color: #CCCCCC;
					}
					.recomend{
						border: 1rpx solid #6db2ff;
						border-radius: 10rpx;
						font-size: 24rpx;
						padding: 0 5rpx;
						color: #6db2ff;
						margin-right: 20rpx;
					}
					.hotel-brand{
						padding: 0 10rpx;
						background-color: #fff0eb;
						font-size: 24rpx;
						color: #ff7455;
						border-radius: 10rpx;
						margin-top: 10rpx;
					}
					.hotel-status{
						font-size: 28rpx;
						color: #8cd6c0;
					}
					.hotel-price{
						justify-content: space-around;
						font-size: 38rpx;
						color: #fe5e5b;
						font-weight: bold;
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>
