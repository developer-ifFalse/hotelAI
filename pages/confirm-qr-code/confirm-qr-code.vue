<template>
	<view class="container">
		<view class="header">
			<view class="header-item">
				<view class="title">酒店名称：</view>
				<view class="info">六点半酒店</view>
			</view>
			<view class="header-item">
				<view class="title">房间号：</view>
				<view class="info">102401</view>
			</view>
			<view class="header-item">
				<view class="title">酒确认时间：</view>
				<view class="info">{{ confirmDate }}</view>
			</view>
		</view>
		<view class="qr-code">
			<view style="color: #2B81AF;margin: 20rpx;">提示：请妥善保管此二维码，将是你进行除进客房外其他活动的依据</view>
			<view class="image">
				<image src="../../static/erweima.jpg" mode="widthFix"></image>
			</view>
			<view style="text-align: center;">有效期：{{ confirmDate }}—{{ validDate }}</view>
			<view style="text-align: center;margin-top: 40rpx;"><button type="primary" @click="saveQrCode">保存二维码</button></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				confirmDate:"",
				validDate:""
			}
		},
		onLoad() {
			let d = new Date();
			this.confirmDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
			this.validDate = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()+2} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
		},
		methods: {
			saveQrCode(){
				uni.showToast({
					title: '已保存'
				});
			}
		}
	}
</script>

<style lang="scss">
	.header-item{
		display: flex;
		align-items: center;
		.title{
			font-weight: bold;
		}
	}
	.header{
		box-shadow: 0 0 18rpx #CCCCCC;
		padding: 20rpx;
		border-radius: 20rpx;
	}
	.container{
		padding: 20rpx;
	}
	.qr-code{
		margin-top: 20rpx;
		.image{
			display: flex;
			align-items: center;
			justify-content: center;
		}
	
	}
</style>
