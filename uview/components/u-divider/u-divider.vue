<template>
	<view class="u-divider" :style="{
		height: height == 'auto' ? 'auto' : height + 'rpx',
		backgroundColor: bgColor
	}">
		<view class="u-divider-line" :style="[lineStyle]"></view>
		<view class="u-divider-text" :style="{
			color: color ? color : $u.color.mainColor,
			fontSize: fontSize
		}"><slot /></view>
		<view class="u-divider-line" :style="[lineStyle]"></view>
	</view>
</template>

<script>
export default {
	props: {
		// 单一边divider横线的宽度(数值)，单位rpx。或者百分比
		halfWidth: {
			type: [Number, String],
			default: 200
		},
		// divider横线的颜色，也可以是primary|info|success|warning|error之一值
		dividerColor: {
			type: String,
			default: '#dcdfe6'
		},
		// 文字颜色
		color: {
			type: String,
			default: '#606266'
		},
		// 文字大小，单位rpx
		fontSize: {
			type: [Number, String],
			default: 28
		},
		// 整个divider的背景颜色
		bgColor: {
			type: String,
			default: '#ffffff'
		},
		// 整个divider的高度单位rpx
		height: {
			type: [Number, String],
			default: 40
		},
	},
	computed: {
		lineStyle() {
			let style = {};
			if(String(this.halfWidth).indexOf('%') != -1) style.width = this.halfWidth;
			else style.width = this.halfWidth + 'rpx';
			if(['primary', 'info', 'success', 'warning', 'error'].indexOf(this.dividerColor) != -1) style.borderColor = this.$u.color[this.type];
			else style.borderColor = this.dividerColor;
			return style;
		}
	}
};
</script>

<style lang="scss" scoped>
.u-divider {
	width: 100%;
	position: relative;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow: hidden;
	flex-direction: row;
}

.u-divider-line {
	border-bottom: 1px solid $u-border-color;
	transform: scale(1, 0.5);
	transform-origin: center;
}

.u-divider-text {
	white-space: nowrap;
	display: inline-flex;
	padding: 0 20rpx;
}
</style>
