<template>
	<view v-if="visibleSync" :style="[customStyle]" :class="{ 'u-drawer-visible': showDrawer }" class="u-drawer">
		<u-mask :maskClickAble="maskCloseAble" :show="showDrawer && mask" @click="maskClick"></u-mask>
		<view  class="u-drawer-content" 
		@tap="modeCenterClose(mode)" 
		:class="[safeAreaInsetBottom ? 'safe-area-inset-bottom' : '', 
			'u-drawer-' + mode, showDrawer ? 'u-drawer-content-visible' : '', 
			zoom && mode == 'center' ? 'u-animation-zoom' : ''
		]"
		 :style="[style]">
			<view class="u-mode-center-box" v-if="mode == 'center'">
				<slot />
			</view>
			<block v-else>
				<slot />
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'uDrawer',
		props: {
			/**
			 * 显示状态
			 */
			show: {
				type: Boolean,
				default: false
			},
			/**
			 * 弹出方向，left|right|top|bottom|center
			 */
			mode: {
				type: String,
				default: 'left'
			},
			/**
			 * 是否显示遮罩
			 */
			mask: {
				type: Boolean,
				default: true
			},
			// 抽屉的宽度(mode=left|right)，或者高度(mode=top|bottom)，单位rpx，或者"auto"，表示由内容撑开高度或者宽度
			length: {
				type: [Number, String],
				default: 'auto'
			},
			// 是否开启缩放动画，只在mode=center时有效
			zoom: {
				type: Boolean,
				default: true
			},
			// 是否开启底部安全区适配，开启的话，会在iPhoneX机型底部添加一定的内边距
			safeAreaInsetBottom: {
				type: Boolean,
				default: false
			},
			// 是否可以通过点击遮罩进行关闭
			maskCloseAble: {
				type: Boolean,
				default: true
			},
			// 用户自定义样式
			customStyle: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				visibleSync: false,
				showDrawer: false,
				timer: null,
				style1: {},
			};
		},
		computed: {
			// 根据mode的位置，设定其弹窗的宽度(mode = left|right)，或者高度(mode = top|bottom)
			style() {
				let style = {};
				let translate = '100%';
				let length = this.length == 'auto' ? 'atuo' : uni.upx2px(this.length) + 'px';
				// 如果是左边或者上边弹出时，需要给translate设置为负值，用于隐藏
				if(this.mode == 'left' || this.mode == 'top') translate = length == 'auto' ? '-100%' : '-' + length; 
				if (this.mode == 'left' || this.mode == 'right') {
					style = {
						width: length,
						height: '100%',
						transform: `translate3D(${translate},0px,0px)`
					}
				} else if (this.mode == 'top' || this.mode == 'bottom') {
					style = {
						width: '100%',
						height: length,
						transform: `translate3D(0px,${translate},0px)`
					}
				} 
				return style;
			},
		},
		watch: {
			show(val) {
				if (val) {
					this.open();
				} else {
					this.close();
				}
			},
		},
		created() {
			// 先让弹窗组件渲染，再改变遮罩和抽屉元素的样式，让其动画其起作用(必须要有延时，才会有效果)
			this.visibleSync = this.show;
			setTimeout(() => {
				this.showDrawer = this.show;
			}, 30);
		},
		methods: {
			// 遮罩被点击
			maskClick() {
				this.close();
			},
			close() {
				this.change('showDrawer', 'visibleSync', false);
			},
			// 中部弹出时，需要.u-drawer-content将居中内容，此元素会铺满屏幕，点击需要关闭弹窗
			// 让其只在mode=center时起作用
			modeCenterClose(mode) {
				if (mode != 'center' || !this.maskCloseAble) return;
				this.close();
			},
			open() {
				this.change('visibleSync', 'showDrawer', true);
			},
			// 此处的原理是，关闭时先通过动画隐藏弹窗和遮罩，再移除整个组件
			// 打开时，先渲染组件，延时一定时间再让遮罩和弹窗的动画起作用
			change(param1, param2, status) {
				this[param1] = status;
				if (this.timer) {
					clearTimeout(this.timer);
				}
				this.timer = setTimeout(
					() => {
						this[param2] = status;
						this.$emit(status ? 'open' : 'close');
					},
					status ? 30 : 300
				);
			}
		}
	};
</script>

<style scoped lang="scss">
	.u-drawer {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		z-index: 999;
	}

	.u-drawer-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
		z-index: 1003;
		transition: all 0.25s linear;
	}

	.u-drawer-left {
		top: 0;
		bottom: 0;
		left: 0;
		background-color: #FFFFFF;
	}

	.u-drawer-right {
		right: 0;
		top: 0;
		bottom: 0;
		background-color: #FFFFFF;
	}

	.u-drawer-top {
		top: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
	}

	.u-drawer-bottom {
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #FFFFFF;
	}

	.u-drawer-center {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		bottom: 0;
		left: 0;
		right: 0;
		top: 0;
		justify-content: center;
		align-items: center;
		opacity: 0;
		z-index: 99999;
	}

	.u-mode-center-box {
		min-width: 100rpx;
		min-height: 100rpx;
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
		background-color: #FFFFFF;
	}

	.u-drawer-content-visible.u-drawer-center {
		transform: scale(1);
		opacity: 1;
	}

	.u-animation-zoom {
		transform: scale(1.15);
	}

	.u-drawer-content-visible {
		transform: translate3D(0px, 0px, 0px) !important;
	}

	.u-drawer-mask {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		opacity: 0;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.4);
		transition: opacity 0.25s;
	}

	.u-drawer-mask-visible {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		opacity: 1;
	}
</style>
