<template>
	<view>
		<swiper-tab-head scrollStyle="background-color: #FFFFFF;" @tabtap="tabtap" :tabBars="tabBars" :tabIndex="tabIndex" :scrollInto="scrollInto"></swiper-tab-head>
		
		<view class="order-list">
			<view class="order-item">
				<view class="top">
					<view>已支付待入住</view>
					<view>￥999.00</view>
				</view>
				<view class="center">
					<view class="hotel-name">六点半大酒店</view>
					<view class="hotel-type">超级豪华大床房</view>
					<view class="live-time">入住：7月7日  离店：7月9日</view>
					<view class="live-tips">
					请在规定时间内办理入住，
					新推出自助办理入住，
					酒店室内3D导航，
					让您的居住更有体验
					</view>
				</view>
				<view class="bottom">
					<button type="primary" @click="selfHelp">自助办理入住</button>
					<button type="primary" @click="hotelNav">酒店内景导航</button>
					<button type="warn" @click="orderDetail">房卡报失</button>
				</view>
			</view>
		</view>
		<tfgg-verify ref="verifyElement" @result="verifyResult"></tfgg-verify>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				scrollInto: "",
				tabIndex: 0,
				tabBars: [{
					name: '全部',
					id: 'all'
				}, {
				
					name: '已入住',
					id: 'yruzhu'
				}, {
					name: '处理中',
					id: 'chuli'
				},
				{
					name: '已确认',
					id: 'yqueren'
				},
				{
					name: '已取消',
					id: 'celce'
				}]
			}
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
				this.scrollInto = this.tabBars[index].id;
			},
			orderDetail(){
				uni.showModal({
					title: '提示',
					content: '确认房卡报失吗？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if(res.confirm){
							uni.showLoading({
								title: '正在报失，请稍后',
								mask: false
							});
							setTimeout(()=>{
								uni.hideLoading();
								uni.showToast({
									title: '已提交前台，等待处理',
									icon:"none"
								});
							},3000)
						}
					}
				});
				
			},
			selfHelp(){
				//自助办理流程   1、
				this.verifyFasong()
			},
			hotelNav(){
				uni.navigateTo({
					url:"../room-nav/room-nav"
				})
			},
			/* 校验结果回调函数 */
			verifyResult(res){
			    if(res){
			        this.$refs.verifyElement.reset();//校验成功重置插件
			        uni.navigateTo({
			        	url: '../checkPhone/checkPhone'
			        });
			    }
			},
			/* 显示校验弹窗 */
			verifyFasong(){
			    this.$refs.verifyElement.show();
			},
			/* 校验插件重置 */
			verifyReset(){
			    this.$refs.verifyElement.reset();
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #e5e5e4;
	}
	@mixin f-ai-jc-c {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	@mixin f-ai-jc-sb {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	@mixin f-ai-jc-fe {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.order-list{
		padding: 20rpx;
		.order-item{
			padding: 20rpx;
			border-radius: 10rpx;
			background-color: #FFFFFF;
			.top{
				@include f-ai-jc-sb;
				padding-bottom: 20rpx;
				border-bottom: 1rpx solid #CCCCCC;
			}
			.center{
				border-bottom: 1rpx solid #CCCCCC;
				padding: 20rpx 0;
				.hotel-name{
					font-size: 38rpx;
					font-weight: bold;
					color: #565656;
				}
				.hotel-type{
					font-size: 32rpx;
					color: #565656;
				}
				.live-time{
					font-size: 32rpx;
					color: #565656;
				}
				.live-tips{
					margin-top: 20rpx;
					font-size: 32rpx;
					color: #ffaa00;
				}
			}
			.bottom{
				margin-top: 20rpx;
				@include  f-ai-jc-fe;
				text-align: right;
				button{
					font-size: 24rpx;
					// color: #FFFFFF;
					// background-color: #64c2ff;
					margin: 0;
					margin-right: 10rpx;
				}
			
			}
		}
	}
</style>
