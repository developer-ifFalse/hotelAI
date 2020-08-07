<template>
	<view>
		<uni-status-bar></uni-status-bar>
		<view class="calendar-content">
			<calendar @change="change2" :show="showCaledar"></calendar>
			<text class="text-center dateStr">{{ dateStr }}</text>
			<button class="btn" @tap="showCaledar = !showCaledar">显示/隐藏</button>
		</view>
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				showCaledar: true,
				dateStr: ''
			}
		},
		methods: {
			change({
				choiceDate,
				dayCount
			}) {
				//参数解释
				//1.choiceDate 时间区间（开始时间和结束时间）
				//2.dayCount 共多少晚

				console.log(choiceDate, dayCount);
				console.log('入住从 ' + choiceDate[0].re + '  到 ' + choiceDate[1].re + '  共 ' + dayCount + ' 晚');
			},
			change2({
				choiceDate,
				dayCount
			}) {
				this.dateStr = '入住从 ' + choiceDate[0].re + ' (星期' + choiceDate[0].week + ')  到 ' + choiceDate[1].re + '(星期' +
					choiceDate[1].week + ')' + '  共 ' + dayCount + ' 晚 ';
			}
		}
	}
</script>

<style>
	.calendar-content {
		width: 100%;
		position: relative;
	}
</style>
