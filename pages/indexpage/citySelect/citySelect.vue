<template>
	<view>
		<city-select @back_city="back_city" :statusBarHeight="statusBarHeight" @backTo="backTo">
		</city-select>
	</view>
</template>

<script>
	import citySelect from '@/components/city-select/city-select.vue';
	export default {
		components: {
			citySelect
		},
		data() {
			return {
				statusBarHeight: 0,
				curentSelectBox: 0
			}
		},
		onLoad(e) {
			this.curentSelectBox = this.$route.query.id;
			uni.getSystemInfo({
				success: (res) => {
					this.statusBarHeight = res.statusBarHeight
				}
			});
		},
		methods: {
			backTo() {
				this.$router.switchTab('/index')
			},
			back_city(data) {
				//返回首页
				this.$router.switchTab('/index', {
					id: this.curentSelectBox,
					data
				})
			}
		}
	}
</script>

<style>

</style>
