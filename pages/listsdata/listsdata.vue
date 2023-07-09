<script>
import store from '@/store/index.js';
export default {
	onLoad: function (option) {
		(this.id = option.id), (this.name = option.name);
	},
	data() {
		return {
			id: Number,
			name: String,
			listsdata: {},
			windowHeight: {
				height: '300px'
			},
			scrollTop: 0,
			old: {
				scrollTop: 0
			}
		};
	},
	computed: {
		shanpsum() {
			return store.state.shanpsum;
		},
		dangqianid() {
			return store.state.dangqianid;
		},
		danqianname() {
			return store.state.danqianname;
		}
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
					store.state.dangqianid=this.listsdata.id;
					store.state.danqianname=this.listsdata.name;
						console.log(store.state.danqianname);
				},
				fail: (err) => {
					// console.log(err);
					if (err.errMsg === 'request:fail timeout') {
						// 在请求超时时触发弹窗显示逻辑
						uni.showToast({
							title: '没有数据，请返回',
							icon: 'none'
						});
					}
				}
			});
		},
		jiamai() {
			uni.request({
				url: 'http://127.0.0.1:8081/GetYonghu',
				data: {
					id: this.id,
					name: this.name,
					font: 1
				},
				success: (res) => {
					console.log(res.data);
					this.DetailsData();
					uni.request({
						url: 'http://127.0.0.1:8081/Sum',
						success: (res) => {
							console.log(res.data.sum);
							store.state.shanpsum = res.data.sum;
						}
					});
				}
			});
		},
		jianmai() {
			uni.request({
				url: 'http://127.0.0.1:8081/GetYonghu',
				data: {
					id: this.id,
					name: this.name,
					font: 0
				},
				success: (res) => {
					console.log(res.data);
					this.DetailsData();
					uni.request({
						url: 'http://127.0.0.1:8081/Sum',
						success: (res) => {
							console.log(res.data.sum);
							store.state.shanpsum = res.data.sum;
						}
					});
				}
			});
		},
		upper: function (e) {
			console.log(e);
		},
		lower: function (e) {
			console.log(e);
		},
		scroll: function (e) {
			console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
		},
		getViewSize() {
			uni.getSystemInfo({
				success: (res) => {
					// #ifdef H5
					// console.log(res.windowHeight);
					this.windowHeight.height = res.windowHeight - 240 - 40 - 50 + 'px';
					// #endif
					// #ifndef H5
					this.windowHeight.height = res.windowHeight - 240 - 30 - 50 + 'px';
					// #endif
					// console.log(this.windowHeight.height);
				}
			});
		},
		registerResizeEvent() {
			uni.onWindowResize(() => {
				this.getViewSize(); // 窗口变化时重新获取视图大小
			});
		}
	},
	mounted() {
		this.DetailsData();
		this.getViewSize(); // 获取初始视图大小
		this.registerResizeEvent(); // 注册窗口变化事件
	}
};
</script>

<template>
	<view>
		<!-- 商品图片 -->
		<view style="margin-bottom: -4px">
			<image src="../../static/image/R-C.jpg" mode=""></image>
		</view>
		<view style="width: 100vw; height: 30px; background-color: #bdc3c7"></view>
		<!-- 商品信息 -->
		<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="windowHeight" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view class="flex" style="padding: 10px 0; margin: 0 10px; justify-content: space-evenly; background-color: #ecf0f1; border-radius: 5px">
				<view class="boxSan" style="max-width: 125px">
					<image class="tubiao" :src="listsdata.img" mode="widthFix"></image>
				</view>
				<view class="flex" style="padding: 0 20px; flex-wrap: wrap; align-content: space-around">
					<view class="flex kuan" style="flex-wrap: wrap">
						<view class="kuan">
							{{ listsdata.name }}
						</view>
						<view class="kuan fontXiao">
							{{ listsdata.type }}
						</view>
					</view>
					<view>
						<view class="flex kuan">
							<view style="margin-right: 20px">库存{{ listsdata.inventory }}份</view>
							<view style="color: brown">{{ listsdata.Price }}￥</view>
						</view>
						<view class="flex" style="align-items: center">
							<uni-icons @click="jianmai" v-if="listsdata.purchase > '0'" type="minus" size="30"></uni-icons>
							{{ listsdata.purchase }}
							<uni-icons @click="jiamai" type="plus" size="30"></uni-icons>
						</view>
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
					<view class="flex" style="align-items: center; padding-top: 10px">
						<view class="flex" style="margin-right: 100px; align-items: flex-end">
							<uni-icons type="contact" size="30"></uni-icons>
							<view style="margin-left: 10px">acaca113</view>
						</view>
						<view class="flex" style="align-items: center">
							<image v-for="item in 4" style="width: 15px" src="../../static/image/star24_on@2x.png" :key="item" mode="widthFix"></image>
							<image v-for="item in 1" style="width: 15px" src="../../static/image/star24_off@2x.png" :key="item" mode="widthFix"></image>
							<view style="padding: 2px; border: 1px #000000 solid; border-radius: 5px; font-size: 12px; margin-left: 20px">好评</view>
						</view>
					</view>

					<view style="padding: 10px 15px; line-height: 28px; font-size: 14px">{{ listsdata.appraise }}</view>
				</view>
			</view>
		</scroll-view>
		<buttom class="paddbuttom kuan"></buttom>
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
.paddbuttom {
	position: fixed;
	bottom: 0;
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
