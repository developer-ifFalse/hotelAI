<template>
	<view class="swiper-item">
		<view>
			<view>目的地</view>
			<view @click="selectAddress(index)" hover-class="hoverClass">
				<view>{{ item.aimAdderss || '重庆' }}</view>
			</view>
			<view @click="getAddress(index)">
				<view class="icon iconfont icon-dingwei1"></view>
				我的位置
			</view>
		</view>
		<view>
			<view>时间</view>
			<view>
				<view hover-class="hoverClass" @click="selectTime(index)">
					<view>{{ item.beginLive }}</view>
					<view style="font-size: 28rpx;font-weight: normal;">{{ item.beginWeek }}</view>
				</view>
				<view hover-class="hoverClass" @click="selectTime(index)">
					<view>{{ item.endLive }}</view>
					<view style="font-size: 28rpx;font-weight: normal;">{{ item.endWeek }}</view>
				</view> 
			</view>
			<view>
				{{ item.dayCount }}
			</view>
		</view>
		<view>
			<view>搜索</view>
			<view hover-class="hoverClass" :class="{'isHaveContent':item.addressOrpingpaiOrJiudian !== ''}">
				{{ item.addressOrpingpaiOrJiudian || '地点/品牌/酒店名称' }}
			</view>
			<view class="icon iconfont icon-shanchu" v-show="item.addressOrpingpaiOrJiudian !== ''" @tap="deletes({index,isShow:1})"></view>
		</view>
		<template v-if="item.isSelectXinji">
			<view>
				<view>星级价格</view>
				<view @click="selectPriceGrade(index)" hover-class="hoverClass" :class="{'isHaveContent':item.priceOrxinji !== ''}">
					{{ item.priceOrxinji || '设置星级/价格' }}
				</view>
				<view class="icon iconfont icon-shanchu" v-show="item.priceOrxinji !== ''" @tap="deletes({index,isShow:2})"></view>
			</view>
		</template>
		<button type="primary" style="margin-top: 20rpx;" @click="confirm">查找酒店</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			item: {
				type: Object,
				default: null
			},
			index: {
				type: Number,
				default: 0
			}
		},
		methods: {
			deletes(item) {
				this.$emit('deletes', item)
			},
			getAddress(index) {
				uni.getLocation({
					type: 'wgs84',
					geocode: true,
					success: (res) => {
						this.$emit('getAddress', res.address.city + res.address.district, index);
					}
				});
			},
			selectAddress(index) {
				this.$router.push('/citySelect', {
					id: index
				})
			},
			selectTime(index){
				this.$emit('selectTime',index)
			},
			selectPriceGrade(index){
				this.$emit('selectPriceGrade',index)
			},
			confirm(){
				this.$emit('confirm')
			}
		}
	}
</script>

<style scoped="scoped">
	.queryBox-input .swiper-item>view:nth-child(1),
	.queryBox-input .swiper-item>view:nth-child(2),
	.queryBox-input .swiper-item>view:nth-child(3),
	.queryBox-input .swiper-item>view:nth-child(4) {
		padding: 20rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		border-bottom: 1rpx solid #CCCCCC;
	}

	.queryBox-input .swiper-item>view:nth-child(1)>view:nth-child(2),
	.queryBox-input .swiper-item>view:nth-child(2)>view:nth-child(2),
	.queryBox-input .swiper-item>view:nth-child(3)>view:nth-child(2),
	.queryBox-input .swiper-item>view:nth-child(4)>view:nth-child(2) {
		flex: 1;
		margin-left: 40rpx;
	}

	.queryBox-input .swiper-item>view:nth-child(1)>view:nth-child(2)>view,
	.queryBox-input .swiper-item>view:nth-child(2)>view:nth-child(2)>view>view,
	.queryBox-input .swiper-item>view:nth-child(3)>view:nth-child(2),
	.queryBox-input .swiper-item>view:nth-child(4)>view:nth-child(2) {
		color: #000000;
		font-weight: bold;
		font-size: 42rpx;
	}

	.queryBox-input .swiper-item>view:nth-child(1)>view:nth-child(1),
	.queryBox-input .swiper-item>view:nth-child(2)>view:nth-child(1),
	.queryBox-input .swiper-item>view:nth-child(3)>view:nth-child(1),
	.queryBox-input .swiper-item>view:nth-child(4)>view:nth-child(1) {
		color: #939393;
		font-size: 32rpx;
		font-weight: bold;
	}

	.queryBox-input .swiper-item>view:nth-child(3)>view:nth-child(2),
	.queryBox-input .swiper-item>view:nth-child(4)>view:nth-child(2) {
		color: #dbdbdb;
	}

	.queryBox-input .swiper-item>view:nth-child(1)>view:nth-child(3) {
		display: flex;
		align-items: center;
	}

	.queryBox-input .swiper-item>view:nth-child(1)>view:nth-child(3)>.iconfont {
		margin-right: 20rpx;
	}

	.queryBox-input .swiper-item>view:nth-child(2)>view:nth-child(2)>view {
		display: flex;
		align-items: center;
	}

	.isHaveContent {
		color: #000000 !important;
	}
</style>
