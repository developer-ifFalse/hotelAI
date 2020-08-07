<template>
	<view>
		<view class="wrapper" :style="'top:'+statusBarHeight+'px'">
			<view class="header">
				<input class="input" type="text" @input="onInput" placeholder="中文/拼音/首字母" v-model="searchValue" />
				<view class="icon iconfont icon-shanchu" style="font-size: 60rpx;color: #CCCCCC;" @click="backTo"></view>
			</view>
			<swiper-tab-head @tabtap="tabtap" :tabBars="tabBars" :tabIndex="tabIndex" scrollItemStyle="width:50%">
			</swiper-tab-head>

			<scroll-view v-if="tabIndex === 0" class="calendar-list" scroll-y="true" :scroll-into-view="scrollIntoId">
				<view v-if="disdingwei" id="hot">
					<!-- 定位模块 -->
					<view class="dingwei">
						<view class="dingwei_Tips">
							当前定位
						</view>
						<view class="dingwei_city">
							<view class="dingwei_city_one" @click="currentAddress">
								{{position}}
							</view>
							<view class="dingweis_div" @click="getWarpweft">
								<view class="icon iconfont icon-dingwei1"></view>
								<text>{{po_tips}}</text>
							</view>
						</view>
					</view>

					<!-- 最近模块 -->
					<view class="dingwei" v-if="Visit.length>=0">
						<view class="dingwei_Tips">
							最近访问
						</view>
						<view class="dingwei_city dingwei_city_zuijin">
							<view class="dingwei_city_one toright" v-for="(item,index) in Visit" :key="index" v-if="index<9" @click="back_city(item)">
								{{item.cityName}}
							</view>
						</view>
					</view>

				</view>

				<!-- 热门城市 -->
				<view class="dingwei">
					<view class="dingwei_Tips">
						热门城市
					</view>
					<view class="dingwei_city dingwei_city_zuijin">
						<view class="dingwei_city_one toright" v-for="(item,index) in hotCity" :key="index" @click="back_city(item)">
							{{item.cityName}}
						</view>
					</view>
				</view>
				<!-- 城市列表 -->
				<view v-if="searchValue == ''" v-for="(item, index) in list" :id="getId(index)" :key="index">
					<view class="letter-header">{{ getId(index) }}</view>
					<view class="city-div" v-for="(city, i) in item" :key="i" @click="back_city(city)">
						<text class="city">{{ city.cityName }}</text>
					</view>
				</view>
				<!-- 搜索结果 -->
				<view class="city-div" v-for="(item, index) in searchList" :key="index" @click="back_city(item)">
					<text class="city">{{ item.cityName }}</text>
				</view>
			</scroll-view>

			<!-- 海外 -->
			<scroll-view v-if="tabIndex === 1" class="calendar-list" scroll-y="true" :scroll-into-view="scrollIntoId">
				<view v-if="disdingwei" id="hot">
					<!-- 定位模块 -->
					<view class="dingwei">
						<view class="dingwei_Tips">
							当前定位
						</view>
						<view class="dingwei_city">
							<view class="dingwei_city_one" @click="currentAddress">
								{{position}}
							</view>
							<view class="dingweis_div" @click="getWarpweft">
								<view class="icon iconfont icon-dingwei1"></view>
								<text>{{po_tips}}</text>
							</view>
						</view>
					</view>

					<!-- 最近模块 -->
					<view class="dingwei" v-if="Visit.length>=0">
						<view class="dingwei_Tips">
							最近访问
						</view>
						<view class="dingwei_city dingwei_city_zuijin">
							<view class="dingwei_city_one toright" v-for="(item,index) in Visit" :key="index" v-if="index<9" @click="back_city(item)">
								{{item.cityName}}
							</view>
						</view>
					</view>

				</view>

				<!-- 热门城市 -->
				<view class="dingwei">
					<view class="dingwei_Tips">
						热门城市
					</view>
					<view class="dingwei_city dingwei_city_zuijin">
						<view class="dingwei_city_one toright" v-for="(item,index) in hotCity" :key="index" @click="back_city(item)">
							{{item.cityName}}
						</view>
					</view>
				</view>

				<!-- 城市列表 -->
				<view v-if="searchValue === ''" v-for="(item, index) in list" :id="getId(index)" :key="index">
					<view class="letter-header">{{ getId(index) }}</view>
					<view class="city-div" v-for="(city, i) in item" :key="i" @click="back_city(city)">
						<text class="city">{{ city.cityName }}</text>
					</view>
				</view>
				<!-- 搜索结果 -->
				<view class="city-div" v-for="(item, index) in searchList" :key="index" @click="back_city(item)">
					<text class="city">{{ item.cityName }}</text>
				</view>
			</scroll-view>
			<!-- 右侧字母 -->
			<view class="letters" v-if="searchValue === ''">
				<view class="letters-item" @click="scrollTo('hot')">最近</view>
				<view class="letters-item" v-for="item in letter" :key="item" @click="scrollTo(item)">{{ item }}</view>
			</view>

			<!-- 选中之后字母 -->
			<view class="mask" v-if="showMask">
				<view class="mask-r">{{selectLetter}}</view>
			</view>
		</view>
	</view>

</template>

<script>
	import Citys from './city.js';
	import swiperTabHead from "../swiper-tab-head/swiper-tab-head.vue"
	export default {
		components: {
			swiperTabHead
		},
		props: {
			statusBarHeight: {
				type: Number,
				default: 22
			}
		},

		computed: {
			hotCity() {
				return Citys.hotCity;
			},

			citys() {
				return Citys.cities;
			}
		},

		data() {
			return {
				tabIndex: 0,
				tabBars: [{
					name: '国内·港澳台',
					id: 'guonei'
				}, {

					name: '海外',
					id: 'haiwai'
				}],
				letter: [],
				selectLetter: '',
				searchValue: '',
				scrollIntoId: '',
				list: [],
				tId: null,
				searchList: [],
				showMask: false,
				disdingwei: true,
				Visit: [], //最近访问
				position: '青岛',
				longitude: '', //经度
				latitude: '', //纬度
				seconds: 3,
				po_tips: '重新定位',
			}
		},

		created() {
			//获取存储的最近访问
			let that = this
			uni.getStorage({
				key: 'Visit_key',
				success: function(res) {
					that.Visit = res.data
				}
			});
			//获取定位 经度纬度
			that.getWarpweft()

			//获取city.js 的程序字母
			let mu = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'w', 'x', 'y',
				'z'
			];
			let tmp = [];
			for (let i = 0; i < mu.length; i++) {
				let item = mu[i];
				for (let j = 0; j < this.citys.length; j++) {
					let py = this.citys[j].py;
					if (py.substring(0, 1) === item) {
						if (tmp.indexOf(item) === -1) {
							this.list[i] = [this.citys[j]];
							tmp.push(item);
							this.letter.push(item.toUpperCase());
						} else {
							this.list[i].push(this.citys[j]);
						}
					}
				}
			}
		},
		methods: {
			//当前位置
			currentAddress() {
				let city = this.position.substring(0, 2);
				this.citys.forEach(item => {
					if (item.cityName.indexOf(city) !== -1) {
						this.back_city(item);
						return false;
					}
				})

			},
			tabtap(index) {
				this.tabIndex = index;
			},
			backTo() {
				this.$emit('backTo')
			},
			getId(index) {
				return this.letter[index];
			},

			scrollTo(letter) {
				this.showMask = true
				this.selectLetter = letter === 'hot' ? '最' : letter
				setTimeout(() => {
					this.showMask = false
				}, 300);
				this.scrollIntoId = letter;
			},


			query(source, text) {
				let res = [];
				let self = this;
				res = source.filter(item => {
					const arr = [];
					let isHave = false;
					Object.keys(item).forEach(prop => {
						const itemStr = item[prop];
						self.isString(itemStr) &&
							itemStr.split(',').forEach(val => {
								arr.push(val);
							});
					});
					arr.some(val => {
						isHave = new RegExp('^' + text).test(val);
						return isHave;
					});
					return isHave;
				});
				// console.log(JSON.stringify(res));
				return res;
			},

			isString(obj) {
				return typeof obj === 'string';
			},

			onInput(e) {
				const value = e.target.value;
				// console.log(value);
				if (value !== '' && this.citys && this.citys.length > 0) {
					const queryData = this.query(this.citys, String(value).trim());
					this.searchList = queryData;
					this.disdingwei = false
				} else {
					this.searchList = [];
					this.disdingwei = true
				}
			},

			back_city(item) {
				if (item) {
					this.$emit('back_city', item);
					//unshift 把数据插入到首位，与push相反
					this.Visit.unshift(item)
					this.searchValue = "";
					this.disdingwei = true
					let arr = this.Visit
					//数组去重
					function distinct(arr) {
						let newArr = []
						for (let i = 0; i < arr.length; i++) {
							if (newArr.indexOf(arr[i]) < 0) {
								newArr.push(arr[i])
							}
						}
						return newArr
					}
					this.Visit = distinct(arr)
					// console.log(JSON.stringify(this.Visi))
					uni.setStorage({
						key: 'Visit_key',
						data: this.Visit
					});
				} else {
					this.$emit('back_city', 'no');
				}

			},
			getWarpweft() {
				this.po_tips = '定位中...'
				let countdown = setInterval(() => {
					this.seconds--;
					uni.getLocation({
						type: 'wgs84',
						geocode: true,
						success: (res) => {
							// console.log('当前位置的经度：' + res.longitude);
							// console.log('当前位置的纬度：' + res.latitude);
							this.longitude = res.longitude
							this.latitude = res.latitude
							this.position = res.address.city;
						}
					});
					if (this.seconds <= 0) {
						this.seconds = 3
						this.po_tips = '重新定位'
						clearInterval(countdown);
					}
				}, 1000);
			}
		}
	};
</script>

<style scoped>
	.wrapper {
		position: fixed;
		z-index: 999999;
		height: 100%;
		width: 100%;
		top: 0px;
		left: 0px;
		background: #FFFFFF;
	}

	.mask {
		position: absolute;
		bottom: 0rpx;
		top: 83rpx;
		left: 0rpx;
		right: 0rpx;
		width: 750rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0);
	}

	.mask-r {
		height: 120rpx;
		width: 120rpx;
		border-radius: 60rpx;
		display: flex;
		background: rgba(0, 0, 0, 0.5);
		justify-content: center;
		align-items: center;
		font-size: 40rpx;
		color: #FFFFFF;
	}

	.content {
		height: 100%;
		width: 100%;
		background-color: #ffffff;
	}

	.header {
		height: 85rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
	}

	.back_div {
		width: 65rpx;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back_img {
		width: 35rpx;
		height: 35rpx;
	}

	.input {
		flex: 1;
		font-size: 28rpx;
		width: 620rpx;
		height: 70rpx;
		border-radius: 40rpx;
		background-color: #F5F5F5;
		padding-left: 20rpx;
		padding-right: 20rpx;
		box-sizing: border-box;
		margin-right: 40rpx;
	}

	.title {
		font-size: 30rpx;
		color: white;
	}

	.show {
		left: 0;
		width: 100%;
		transition: left 0.3s ease;
	}

	.hide {
		left: 100%;
		width: 100%;
		transition: left 0.3s ease;
	}


	.title {
		font-size: 30rpx;
		color: white;
	}

	.calendar-list {
		position: absolute;
		top: 185rpx;
		bottom: 0rpx;
		width: 100%;
		background-color: #FFFFFF;
	}

	.letters {
		position: absolute;
		right: 30rpx;
		bottom: 0px;
		width: 50rpx;
		top: 260rpx;
		color: #2f9bfe;
		text-align: center;
		font-size: 24rpx;
	}

	.letters-item {
		margin-bottom: 5rpx;
	}

	.letter-header {
		height: 45rpx;
		font-size: 22rpx;
		color: #333333;
		padding-left: 24rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background-color: #ebedef;

	}

	.city-div {
		width: 660rpx;
		height: 85rpx;
		margin-left: 24rpx;
		border-bottom-width: 0.5rpx;
		border-bottom-color: #ebedef;
		border-bottom-style: solid;
		display: flex;
		align-items: center;
		margin-right: 35rpx;
	}

	.city {
		font-size: 28rpx;
		color: #000000;
		padding-left: 30rpx;
	}

	.dingwei {
		width: 100%;
		padding-top: 25rpx;
		box-sizing: border-box;
		margin-bottom: 26rpx;
	}

	.dingwei_Tips {
		margin-left: 24rpx;
		margin-bottom: 24rpx;
		font-size: 24rpx;
		color: #A5A5A5;
	}

	.dingwei_city {
		width: 100%;
		padding-left: 55rpx;
		padding-right: 70rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.dingwei_city_one {
		width: 185rpx;
		height: 60rpx;
		background-color: #F5F5F5;
		border-radius: 10rpx;
		font-size: 32rpx;
		color: #333333;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dingweis_div {
		display: flex;
		align-content: flex-end;
		align-items: center;
		font-size: 24rpx;
		font-weight: bold;
		margin-right: 30rpx;
	}

	.icon-dingwei1 {
		margin-right: 10rpx;
	}

	.dingweis {
		width: 32rpx;
		height: 32rpx;
	}

	.dingwei_city_zuijin {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;

	}

	.toright {
		margin-right: 25rpx;
		margin-top: 10rpx;
	}
</style>
