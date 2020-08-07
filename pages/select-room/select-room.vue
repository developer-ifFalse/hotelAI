<template>
	<view class="container">
		<image src="../../static/ai.png" mode="widthFix"></image>
		<button type="primary" style="z-index: 999999;" @click="confirmSelect">确定选择</button>
		<view class="goroup-radio">
			<radio-group>
			    <label class="lable" v-for="(item, index) in items" :key="item.value">
			        <radio :value="item.value" :checked="index === current" />
			    </label>
			</radio-group>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
				        value: '102401',
				    },
				    {
				        value: '102402',
				    },
				    {
				        value: '102403',
				    },
				    {
				        value: '102404',
				    },
				    {
				        value: '102405',
				    },
				    {
				        value: '102406',
				    },
					{
					    value: '102407',
					},
					{
					    value: '102408',
					},
					{
					    value: '102409',
					},
					{
					    value: '102410',
					},
					{
					    value: '102411',
					},
					{
					    value: '102412',
					},
					{
					    value: '102413',
					},
					{
					    value: '102414',
					},
					{
					    value: '102415',
					},
					{
					    value: '102416',
					},
					{
					    value: '102417',
					},
					{
					    value: '102418',
					},
				],
				 current:0
			}
		},
		methods: {
			confirmSelect(){
				uni.showLoading({
					title: '正在确认',
					mask: false
				});
				setTimeout(()=>{
					uni.hideLoading();
					uni.navigateTo({
						url: '../confirm-qr-code/confirm-qr-code'
					});
				},3000)
				
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding: 40rpx;
		button{
			margin-top: 40rpx;
		}
	}
	.lable{
		display: block;
		margin-top: 55rpx;
		&:nth-child(10){
			position: absolute;
			left: 430rpx;
			top: -10rpx;
		}
		&:nth-child(11){
			position: absolute;
			left: 430rpx;
			top: 90rpx;
		}
		&:nth-child(12){
			position: absolute;
			left: 430rpx;
			top: 200rpx;
		}
		&:nth-child(13){
			position: absolute;
			left: 430rpx;
			top: 340rpx;
		}
		&:nth-child(14){
			position: absolute;
			left: 430rpx;
			top: 440rpx;
		}
		&:nth-child(15){
			position: absolute;
			left: 430rpx;
			top: 540rpx;
		}
		&:nth-child(16){
			position: absolute;
			left: 430rpx;
			top: 670rpx;
		}
		&:nth-child(17){
			position: absolute;
			left: 430rpx;
			top: 770rpx;
		}
		&:nth-child(18){
			position: absolute;
			left: 430rpx;
			top: 870rpx;
		}
	}
	.goroup-radio{
		position: absolute;
		top: 20rpx;
		height: 100%;
		left: 160rpx;
		width: 100%;
		
	}
</style>
