<template>
	<view class="u-collapse-item">
		<view class="u-collapse-head" @tap.stop="headClick" hover-class="u-hover-class" :style="{
			backgroundColor: headBgColor,
		}">
			<view class="u-collapse-title u-line-1">
				{{title}}
			</view>
			<u-icon v-if="arrow" :color="arrowColor ? arrowColor : $u.color.tipsColor" :class="{'u-arrow-down-icon-active': isShow}" class="u-arrow-down-icon" name="arrow-down"></u-icon>
		</view>
		<view class="u-collapse-body" :style="{
			backgroundColor: bodyBgColor,
			height: isShow ? height + 'px' : '0',
		}">
			<view class="u-collapse-content" :id="elId">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 标题
			title: {
				type: String,
				default: ''
			},
			// 是否可以点击收起
			disabled: {
				type: Boolean,
				default: false
			},
			// collapse显示与否
			open: {
				type: Boolean,
				default: false
			},
			// 唯一标识符
			name: {
				type: [Number, String],
				default: ''
			},
		},
		inject: ['uCollapse'],
		data() {
			return {
				isShow: false,
				elId: this.$u.guid(),
				height: 0, // body内容的高度
				headBgColor: '#ffffff',
				bodyBgColor: '#ffffff',
				arrowColor: '',
				
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.queryRect();
			})
		},
		watch: {
			open(val) {
				this.isShow = val
			}
		},
		computed: {
			arrow() {
				return this.uCollapse.arrow;
			}
		},
		created() {
			this.isShow = this.open;
			this.nameSync = this.name ? this.name : this.uCollapse.childrens.length
			this.uCollapse.childrens.push(this)
			this.headBgColor = this.uCollapse.headBgColor;
			this.bodyBgColor = this.uCollapse.bodyBgColor;
			this.arrowColor = this.uCollapse.arrowColor;
		},
		methods: {
			// 点击collapsehead头部
			headClick() {
				if (this.disabled) return;
				if(this.uCollapse.accordion == true) {
					this.uCollapse.childrens.map(val => {
						// 自身不设置为false，因为后面有this.isShow = !this.isShow;处理了
						if(this != val) {
							val.isShow = false;
						}
					})
				}
				this.isShow = !this.isShow;
				// 只有在打开时才发出事件
				if(this.isShow) this.uCollapse.onChange();
				this.$forceUpdate();
			},
			// 查询内容高度
			queryRect() {
				const query = uni.createSelectorQuery().in(this);
				query.select('#' + this.elId).boundingClientRect(data => {
					if(!data.height) {
						setTimeout(() => {
							this.queryRect();
						}, 10)
						return ;
					}
					this.height = data.height;
				}).exec();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-collapse-head {
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.u-collapse-title {
		flex: 1;
		overflow: hidden;
		margin-right: 14rpx;
		font-size: 30rpx;
		color: $u-main-color;
		line-height: 1;
		padding: 24rpx 0;
		text-align: left;
	}

	.u-arrow-down-icon {
		transition: all 0.3s;
		margin-right: 24rpx;
	}

	.u-arrow-down-icon-active {
		transform: rotate(180deg);
		transform-origin: center center;
	}
	
	.u-collapse-body {
		overflow: hidden;
		transition: all 0.3s;
	}

	.u-collapse-content {
		overflow: hidden;
		font-size: 28rpx;
		color: $u-tips-color;
		text-align: left;
	}
</style>
