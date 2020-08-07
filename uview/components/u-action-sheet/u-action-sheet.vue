<template>
	<u-popup mode="bottom" :show="show" :maskCloseAble="maskCloseAble" length="auto" :safeAreaInsetBottom="safeAreaInsetBottom" @close="close">
		<view class="u-tips u-border-bottom" v-if="tips.text" :style="tipsStyle">
			{{tips.text}}
		</view>
		<block v-for="(item, index) in list" :key="index">
			<view @touchmove.stop.prevent @tap="itemClick(index)" :style="[itemStyle(index)]" class="u-action-sheet-item" :class="[index < list.length - 1 ? 'u-border-bottom' : '']"
			 hover-class="u-hover-class" :hover-stay-time="150">
				{{item.text}}
			</view>
		</block>
		<view class="u-gab" v-if="cancelBtn">
		</view>
		<view @touchmove.stop.prevent class="u-actionsheet-cancel u-action-sheet-item" hover-class="u-hover-class" :hover-stay-time="150" v-if="cancelBtn"
		 @tap="close">取消</view>
	</u-popup>
</template>

<script>
	export default {
		props: {
			// 点击遮罩是否可以关闭actionsheet
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// actionsheet显示与否
			show: {
				type: Boolean,
				default: false
			},
			// 按钮的文字数组，可以自定义颜色和字体大小，字体单位为rpx
			list: {
				type: Array,
				default () {
					// 如下
					// return [{
					// 	text: '确定',
					// 	color: '',
					// 	fontSize: ''
					// }]
					return [];
				}
			},
			// 顶部的提示文字
			tips: {
				type: Object,
				default () {
					return {
						text: '',
						color: '',
						fontSize: '26'
					}
				}
			},
			// 底部的取消按钮
			cancelBtn: {
				type: Boolean,
				default: true
			},
			// 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			// 顶部提示的样式
			tipsStyle() {
				let style = {};
				if (this.tips.color) style.color = this.tips.color;
				if (this.tips.fontSize) style.fontSize = this.tips.fontSize + 'rpx';
				return style;
			},
			// 操作项目的样式
			itemStyle() {
				return (index) => {
					let style = {};
					if (this.list[index].color) style.color = this.list[index].color;
					if (this.list[index].fontSize) style.fontSize = this.list[index].fontSize + 'rpx';
					return style;
				}
			}
		},
		methods: {
			// 点击取消按钮
			close() {
				this.$emit('close');
			},
			// 点击某一个itemif (!this.show) return;
			itemClick(index) {
				this.$emit('click', index);
				this.close();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.u-tips {
		font-size: 26rpx;
		text-align: center;
		padding: 34rpx 0;
		line-height: 1;
		color: $u-tips-color;
	}

	.u-action-sheet-item {
		display: flex;
		line-height: 1;
		justify-content: center;
		align-items: center;
		font-size: 34rpx;
		padding: 34rpx 0;
	}

	.u-gab {
		height: 12rpx;
		background-color: rgb(234, 234, 236);
	}

	.u-actionsheet-cancel {
		color: $u-main-color;
	}
</style>
