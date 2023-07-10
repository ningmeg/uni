<template>
	<view>
		<uni-goods-nav :fill="true" :options="options" @click="guowu" @buttonClick="guowuyou" />
	</view>
</template>

<script>
import store from '@/store/index.js';
export default {
	data() {
		return {
			sum: 1,
			options: [
				{
					icon: 'star-filled',
					text: '收藏'
				},

				{
					icon: 'cart',
					text: '购物车',
					info: 0
				}
			]
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
	watch: {
		shanpsum(newVal) {
			this.options[1].info = newVal;
		}
	},
	methods: {
		guowu(e) {
			let aa = e.content.text;
			if (aa === '收藏'||aa==='已收藏') {
				// console.log(store.state.dangqianid, store.state.danqianname);
				uni.request({
					url: 'http://127.0.0.1:8081/ShouCang',
					data: {
						id: store.state.dangqianid,
						name: store.state.danqianname
					},
					success: (res) => {
						// console.log(res.data.bor);

						if (res.data.bor === 1) {
							this.options[0].text = '已收藏';
							uni.showToast({
								title: `收藏成功`,
								icon: 'none'
							});
						} else {
							this.options[0].text = '收藏';
							uni.showToast({
								title: `取消收藏`,
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						if (err.errMsg === 'request:fail timeout') {
							// 在请求超时时触发弹窗显示逻辑
							uni.showToast({
								title: '没有数据，请返回',
								icon: 'none'
							});
						}
					}
				});
			}
		},
		guowuyou(e) {
			console.log(e);
		},
		GetChushi() {
			uni.request({
				url: 'http://127.0.0.1:8081/Sum',
				success: (res) => {
					console.log(res.data);
					this.sum = res.data.sum;
					this.options[1].info = this.sum;
				}
			});
		}
	},
	mounted() {
		this.GetChushi();
	}
};
</script>

<style>
.example-body {
	padding: 0;
	/* #ifndef APP-NVUE */
	display: block;
	/* #endif */
}

.goods-carts {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	position: fixed;
	left: 0;
	right: 0;
	/* #ifdef H5 */
	left: var(--window-left);
	right: var(--window-right);
	/* #endif */
	bottom: 0;
}
</style>
