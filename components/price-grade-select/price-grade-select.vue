<template>
	<view class="price-grade-select animated bounceInUp">
		<!-- 遮罩 -->
		<view class="shades" @click="closeQuery"></view>
		<!-- 星级 -->
		<view class="price-grade-content">
			<view class="grade-select">
				<view class="gread-select-title">
					星级(可多选)
				</view>
				<view class="gread-select-content">
					<block v-for="(item,index) in priceGrade.grades" :key="index">
						<view 
						class="grade-item" 
						@click="gradeClick(index)"
						:class="{'grade-item-active':gradeIndexs.some(i=>i===index)}"
						>{{ item }}
						</view>
					</block>
				</view>
			</view>
			<view class="price-select">
				<view class="price-select-title">
					价格<text>{{ currentPrice }}</text>
				</view>
				 <view>
					 <range-slider 
					 width="710" 
					 bar-height="10" 
					 background-color="#fff" 
					 active-color="#4399fe" 
					 @rangechange="rangechange"
					 min=0
					 max=75
					 step=5
					 >
					 </range-slider>
				 </view>
				<view>
					<scroll-view scroll-y="true" class="price-select-scroll">
						<view class="price-select-content">
							<block v-for="(item,index) in priceGrade.prices" :key="index">
								<view 
								class="price-item"
								@click="priceClick(index)"
								:class="{'price-item-active':priceIndex === index}"
								>
								{{ item }}
								</view>
							</block>
						</view>
					</scroll-view>
				</view>
			</view>
			<view class="price-grade-bottom">
				<button type="default" :disabled="isdisabled" @click="clearSelect">清空选择</button>
				<button type="primary" @click="curentPriceGrade">确定</button>
			</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data(){
			return{
				isdisabled: true,
				currentPrice:"￥0-750",
				priceIndex:0,
				gradeIndexs:[0]
			}
		},
		props:{
			priceGrade:{
				type:Object
			}
		},
		methods:{
			closeQuery(){
				this.$emit('closeQuery')
			},
			rangechange(ev){
				let max = 0,
					min = 0;
				if(ev.maxValue >= 750){
					max = ev.maxValue;
				} else {
					max = ev.maxValue * 10;
				}
				min = ev.minValue * 10;
				this.currentPrice = `￥${min}-${max}`;
			},
			clearSelect(){
				this.currentPrice="￥0-100";
				this.priceIndex=0;
				this.gradeIndexs=[0];
				this.isdisabled=true;
			},
			priceClick(index){
				if(this.priceIndex === index){
					this.priceIndex = 0
				} else {
					this.priceIndex = index;
					this.currentPrice = this.priceGrade.prices[index];
					this.isdisabled = false;
				} 
			},
			gradeClick(index){
				if(this.gradeIndexs.length >= 3){
					this.gradeIndexs = [];
					this.gradeIndexs[0] = 0;
				} else {
					//判断是否包含0
					let i = this.gradeIndexs.indexOf(0);
					if(i !== -1){ //把0删除 因为选择后面的自动不选择第一个
						this.gradeIndexs.splice(i,1);
					}
					this.gradeIndexs.push(index);
					this.isdisabled = false;
				}
			},
			curentPriceGrade(){
				this.$emit('curentPriceGrade',this.currentPrice,this.gradeIndexs);
			}
		}
	}
</script>

<style lang="scss">
	.price-grade-content {
		padding: 20rpx;
		background-color: #FFFFFF;
		position: absolute;
		bottom: 0;
	}
	
	.price-grade-select {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 9999999;
	
	}
	
	.shades {
		position: absolute;
		height: 100%;
		width: 100%;
		background-color: #ccc;
		opacity: 0.5;
	}
	
	.gread-select-title,
	.price-select-title {
		color: #333333;
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.gread-select-content,
	.price-select-content {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	
	}
	
	.grade-item-active,
	.price-item-active {
		color: #4399fe !important;
		border: 1rpx solid #4399fe;
		box-sizing: border-box;
	}
	
	.grade-item,
	.price-item {
		text-align: center;
		width: 200rpx;
		height: 80rpx;
		line-height: 80rpx;
		background-color: #f4f4f4;
		color: #3d3d3d;
		border-radius: 10rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
	}
	
	.price-select {
		margin-top: 40rpx;
	}
	
	.price-select>.price-select-title text {
		color: #4399fc;
	}
	
	.price-select-scroll {
		height: 260rpx;
	}
	
	
	
	.price-grade-bottom {
		display: flex;
		margin-top: 40rpx;
	}
	
	.price-grade-bottom>button:first-child {
		width: 260rpx;
		margin-right: 20rpx;
	}
	
	.price-grade-bottom>button:last-child {
		flex: 1;
	}
</style>
