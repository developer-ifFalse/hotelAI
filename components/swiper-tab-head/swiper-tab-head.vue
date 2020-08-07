<template>
	<view>
		<view class="uni-tab-bar">
			<scroll-view 
			scroll-x
			class="uni-swiper-tab" 
			:style="scrollStyle"
			scroll-with-animation
			:scroll-into-view="scrollInto" 
			>
				<block v-for="(tab,index) in tabBars" :key="index">
					<view 
					:id="tab.id"
					class="swiper-tab-list" 
					:class="{'active':tabIndex===index}" 
					@tap="tabtap(index)" 
					:style="scrollItemStyle">
						{{ tab.name }}{{ tab.num ? tab.num : '' }}
						<view class="swiper-tab-list-line"></view>
					</view>
				</block>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		props:{
			"scrollInto":{
				type:String
			},
			 "tabBars":Array,
			 "tabIndex":Number,
			 "scrollStyle":{   //导航自定义样式
				 type:String,
				 default:''
			 },
			 scrollItemStyle:{
				 type:String,
				 default:''
			 }
		},
		methods:{
			tabtap(index){
				this.$emit('tabtap',index)
			}
		}
	}
</script>

<style>
	.swiper-tab-list {
		color: #888888;
		font-weight: bold;
	}
	
	.uni-tab-bar .active {
		color: #4ec5ee;
	}
	
	.active .swiper-tab-list-line {
		border-bottom: 6rpx solid #4ec5ee;
		border-top: 6rpx solid #4ec5ee;
		margin: auto;
		width: 70rpx;
		border-radius: 6rpx;
	}
</style>
