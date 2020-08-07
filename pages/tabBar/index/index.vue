<template>
	<view class="index-content">
		<uni-status-bar></uni-status-bar>
		<view class="top-content">
			<!-- 轮播图 -->
			<view class="top-swiper">
				<swiper style="height: 200rpx;" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item>
						<view class="swiper-item">
							<image src="/static/swiper/swiper1.jpg" mode="widthFix" lazy-load></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="/static/swiper/swiper2.jpg" mode="widthFix" lazy-load></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item">
							<image src="/static/swiper/swiper3.jpg" mode="widthFix" lazy-load></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 查询框 -->
			<view class="top-queryBox">
				<view style="background-color: #f8f8f8;">
					<swiper-tab-head @tabtap="tabtap" :tabBars="tabBars" :tabIndex="tabIndex" :scrollInto="scrollInto" scrollItemStyle="width:33.333%"></swiper-tab-head>
				</view>
				<view class="queryBox-input">
					<swiper class="swiper-box" :current="tabIndex" @change="swiperChange">
						<block v-for="(item,index) in dataLists" :key="index">
							<swiper-item>
								<query-box :item="item" @confirm="confirm" @selectAddress="selectAddress" @getAddress="getAddress" @deletes="deletes" @selectTime='selectTime'
								 @selectPriceGrade="selectPriceGrade" :index="index">
								</query-box>
							</swiper-item>
						</block>
					</swiper>
				</view>
			</view>
		</view>
		<view class="bottom-content">
			<view class="many-options">
				<view>
					<view class="icon iconfont icon-kezhangongyu"></view>
					<view>民宿公寓</view>
				</view>
				<view>
					<view class="icon iconfont icon-clock"></view>
					<view>钟点房</view>
				</view>
				<view>
					<view class="icon iconfont icon-youhuifangshi"></view>
					<view>特惠酒店</view>
				</view>
				<view>
					<view class="icon iconfont icon-guojihuochepiao"></view>
					<view>火车票</view>
				</view>
			</view>
		</view>
		<!-- 日期选择 -->
		<calendar @change="change" :show="showCaledar">
		</calendar>
		<!-- 星级价格选择框 -->
		<price-grade-select @closeQuery="closeQuery" :priceGrade="priceGrade" @curentPriceGrade="curentPriceGrade" v-if="showPriceGeade">
		</price-grade-select>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showCaledar: false,
				showPriceGeade: false,
				priceGrade: {
					grades: ["不限", "经济", "三星舒适", "四星高档", "五星豪华"],
					prices: ["不限", "￥0-100", "￥100-300", "￥300-400", "￥400-600", "￥600-750", "￥750以上"]
				},
				dataLists: [{ //国内
						priceOrxinji: "五星级", //设置星级/价格
						addressOrpingpaiOrJiudian: "牛逼酒店", //地点/品牌/酒店名称
						beginLive: "2月17日", //开始居住时间
						endLive: "2月17日", //结束居住时间
						dayCount: "共一晚",
						beginWeek: "周一入住",
						endWeek: "周一离店",
						aimAdderss: "", //目的地
						isSelectXinji: true
					},
					{ //海外
						priceOrxinji: "五星级", //设置星级/价格
						addressOrpingpaiOrJiudian: "牛逼酒店", //地点/品牌/酒店名称
						beginLive: "2月17日", //开始居住时间
						endLive: "2月17日", //结束居住时间
						dayCount: "共一晚",
						beginWeek: "周一入住",
						endWeek: "周一离店",
						aimAdderss: "", //目的地
						isSelectXinji: true
					},
					{ //民宿(没有星级选择器)
						addressOrpingpaiOrJiudian: "牛逼酒店", //地点/品牌/酒店名称
						beginLive: "2月17日", //开始居住时间
						endLive: "2月17日", //结束居住时间
						dayCount: "共一晚",
						beginWeek: "周一入住",
						endWeek: "周一离店",
						aimAdderss: "", //目的地
						isSelectXinji: false
					}
				],
				scrollInto: "",
				currentListIndex: 0, //当前的查询框（三个其中一个）
				tabIndex: 0,
				tabBars: [{
					name: '国内',
					id: 'guanzhu'
				}, {

					name: '海外',
					id: 'tuijian'
				}, {
					name: '民宿公寓',
					id: 'tiyu'
				}]
			}
		},
		onLoad(e) {

		},
		onShow() {
			if (JSON.stringify(this.$route.query) !== "{}") {
				let index = this.$route.query.id;
				let d = this.$route.query.data.cityName;
				this.dataLists[index].aimAdderss = d;
			}
		},
		methods: {
			tabtap(index) {
				this.tabIndex = index;
			},
			swiperChange(event) {
				let index = event.detail.current;
				this.tabIndex = index
				this.scrollInto = this.tabBars[index].id;
			},
			//删除搜索和星级的价格
			deletes(item) {
				item.isShow === 1 ?
					this.dataLists[item.index].addressOrpingpaiOrJiudian = '' :
					this.dataLists[item.index].priceOrxinji = '';
			},
			//获取当前地址
			getAddress(data, index) {
				this.dataLists[index].aimAdderss = data;
			},
			//选择搜索地址
			selectAddress(index) {
				this.currentListIndex = index;
				uni.navigateTo({
					url: "../../indexpage/citySelect/citySelect"
				})
			},
			//选择日期
			selectTime(index) {
				this.currentListIndex = index;
				this.showCaledar = !this.showCaledar;
			},
			change({
				choiceDate,
				dayCount
			}) {
				let index = this.currentListIndex;
				this.dataLists[index].dayCount = '  共 ' + dayCount + ' 晚 ';
				this.dataLists[index].beginLive = `${choiceDate[0].month}月${choiceDate[0].day}日`;
				this.dataLists[index].endLive = `${choiceDate[1].month}月${choiceDate[1].day}日`;
				this.dataLists[index].beginWeek = `周${choiceDate[0].week}入住`;
				this.dataLists[index].endWeek = `周${choiceDate[1].week}离店`;
			},
			// 星级价格选择模块
			selectPriceGrade(index) {
				this.currentListIndex = index;
				this.showPriceGeade = !this.showPriceGeade;
			},
			closeQuery() {
				this.showPriceGeade = !this.showPriceGeade;
			},
			curentPriceGrade(currentPrice, gradeIndexs) {
				let curGrade = ""
				gradeIndexs.forEach(i => {
					curGrade += this.priceGrade.grades[i]
				})
				let index = this.currentListIndex;
				this.dataLists[index].priceOrxinji = currentPrice + curGrade;
				this.closeQuery();
			},
			// 确认搜索
			confirm(){
				uni.navigateTo({
					url: '../../search-hotel/search-hotel'
				});
			}
		}
	}
</script>

<style lang="scss">
	.hoverClass {
		background: #F4F4F4;
	}

	.index-content {
		background: url("../../../static/bg.jpg") 0 0 no-repeat;
		background-size: cover;
	}

	.top-content {
		padding: 20rpx;
	}

	.top-swiper .swiper-item image {
		width: 100%;
	}

	.top-queryBox {
		margin-top: 20rpx;
		background: #ffffff;
	}

	.swiper-box {
		height: 700rpx;
	}

	.queryBox-input {
		padding: 0 20rpx;
	}


	.bottom-content {
		padding: 20rpx;
		background: #f3f3f3;
	}

	.bottom-content .many-options {
		display: flex;
		justify-content: space-around;
		background-color: #FFFFFF;
		padding: 30rpx 40rpx;
		text-align: center;
	}

	.bottom-content .many-options view:nth-child(1) {
		font-size: 70rpx;
		color: #576a95;
		height: 120rpx;
	}

	.bottom-content .many-options view:nth-child(2) {
		font-size: 30rpx;
		color: #333333;
	}
</style>
