<template>
	<view class="content">
		<view class="title">
			中国大学生服务外包——创新创业大赛
		</view>
		<view class="info">
			<view>
				收款方
			</view>
			<view>
				比赛专用
			</view>
		</view>
		
		<view class="btn">
			<button type="default" @click="pay">立即支付</button>
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
			pay(){
				uni.showToast({
					title: '您已支付'
				});
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F1F1F1;
	}
	.title{
		padding: 20rpx;
		text-align: center;
		font-size: 46rpx;
		font-weight: bold;
	}
	.info{
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		align-items: center;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #CCCCCC;
		border-top: 1rpx solid #CCCCCC;
	}
	.btn{
		margin-top: 40rpx;
		padding: 20rpx;
		button{
			background: #07c160;
			color: #FFFFFF;
		}
	}
</style>
