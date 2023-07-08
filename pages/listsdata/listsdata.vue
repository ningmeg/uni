<script>
export default {
	onLoad: function (option) {
		(this.id = option.id), (this.name = option.name);
	},
	data() {
		return {
			id: Number,
			name: String,
			listsdata: {}
		};
	},
	methods: {
		DetailsData() {
			uni.request({
				url: 'http://127.0.0.1:8081/list/listsdata',
				data: {
					id: this.id,
					name: this.name
				},
				success: (res) => {
					console.log(res.data[0]);
					this.listsdata = res.data[0];
					console.log(this.listsdata);
				}
			});
		}
	},
	mounted() {
		this.DetailsData();
	}
};
</script>

<template>
	<view>
		<!-- 商品图片 -->
		<view style="margin-bottom: -4px">
			<image src="../../static/image/R-C.jpg" mode=""></image>
		</view>
		<view style="width: 100vw; height: 30px; background-color: #bdc3c7; margin-bottom: 10px"></view>
		<!-- 商品信息 -->
		<view class="flex" style="padding: 10px 0; margin: 0 10px; justify-content: space-evenly; background-color: #ecf0f1; border-radius: 5px">
			<view class="boxSan" style="max-width: 125px">
				<image class="tubiao" :src="listsdata.img" mode="widthFix"></image>
			</view>
			<view class="flex" style="padding: 0 20px; flex-wrap: wrap; align-content: space-around">
				<view class="flex" style="flex-wrap: wrap">
					<view class="kuan">
						{{ listsdata.name }}
					</view>
					<view class="kuan fontXiao">
						{{ listsdata.type }}
					</view>
				</view>

				<view class="flex kuan">
					<view style="margin-right: 20px">库存{{ listsdata.inventory }}份</view>
					<view style="color: brown">{{ listsdata.Price }}￥</view>
				</view>
			</view>
		</view>
		<!-- 商品介绍 -->
		<view style="padding: 10px 15px; margin: 20px 10px; justify-content: space-evenly; background-color: #ecf0f1; border-radius: 5px">
			<view style="">
				<view class="fontDa">商品介绍:</view>
				<view style="padding: 10px 15px; line-height: 28px; font-size: 14px">
					{{ listsdata.Details }}
				</view>
			</view>
		</view>
		<!-- 商品评价 -->
		<view style="padding: 10px 15px; margin: 20px 10px; justify-content: space-evenly; background-color: #ecf0f1; border-radius: 5px">
			<view style="">
				<view class="fontDa">商品评价:</view>
				<!-- 评价循环体 -->
				<view class="flex" style="align-items: center;padding-top: 10px;">
					<view class="flex" style="margin-right: 100px;align-items: flex-end;">
						<uni-icons type="contact" size="30"></uni-icons>
						<view style="margin-left: 10px;">acaca113</view>
					</view>
					<view class="flex" style="align-items: center;">
						<image v-for="item in 4" style="width: 15px" src="../../static/image/star24_on@2x.png" :key="item" mode="widthFix"></image>
						<image v-for="item in 1" style="width: 15px" src="../../static/image/star24_off@2x.png" :key="item" mode="widthFix"></image>
						<view style="padding: 2px;border: 1px #000000 solid;border-radius: 5px;font-size: 12px;margin-left: 20px;">好评</view>
					</view>
				</view>

				<view style="padding: 10px 15px; line-height: 28px; font-size: 14px">
					{{ listsdata.appraise }}
				</view>
			</view>
		</view>
	</view>
</template>

<style scoped>
.flex {
	display: flex;
}
.tubiao {
	width: 100%;
}
.kuan {
	width: 100%;
}
.fontDa {
	font-size: 18px;
	font-weight: bold;
}
.fontXiao {
	font-size: 12px;
	color: #bdc3c7;
}

/* #ifdef H5 */
image {
	width: 100vw;
}
.boxSan {
	width: 30vw;
}

/* #endif */

/* #ifndef H5 */
image {
	width: 750rpx;
}
.boxSan {
	width: 225rpx;
}
/* #endif */
</style>
