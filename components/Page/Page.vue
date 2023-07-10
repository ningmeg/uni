<template>
	<view>
		<view class="flex">
			<button ref="buttons" class="buttons" v-for="(item, index) in tabs" :key="index" @click="button(index, item)" :class="{ active: activeButton === index }">
				{{ item }}
			</button>
		</view>
		<scroll-view :scroll-top="scrollTop" scroll-y="true" :style="windowHeight" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
			<view class="page">
				<view class="" v-for="(item, i) in listsDtada" :key="i">
					<uni-list>
						<uni-list-item
							:title="item.name"
							:note="item.type"
							showArrow
							thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
							thumb-size="lg"
							:rightText="item.Price.toString()"
							clickable
							@click="listsClick(item, i)"
						/>
					</uni-list>
				</view>
			</view>
		</scroll-view>
		<!-- <view style="height: 50px"></view> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabs: ['全部', '热门', '收藏', '关注', '同城'],
			listsDtada: [],
			windowHeight: {
				height: '300px'
			},
			scrollTop: 0,
			old: {
				scrollTop: 0
			},
			activeButton: 0
		};
	},
	methods: {
		button(index, item) {
			this.activeButton = index;
			// console.log(item);
			this.getData(item);
		},
		getData(item) {
			let data = item || '全部';
			// console.log(data);
			uni.request({
				url: 'http://127.0.0.1:8081/listData',
				data: {
					text: data
				},
				header: {
					'custom-header': 'Content-Type'
				},
				timeout: 5000, // 设置超时时间为5秒
				success: (res) => {
					console.log(res.data);
					this.listsDtada = res.data;
				},
				fail: (err) => {
					// console.log(err);
					if (err.errMsg === 'request:fail timeout') {
						// 在请求超时时触发弹窗显示逻辑
						uni.showToast({
							title: '请求超时',
							icon: 'none'
						});
					}
				}
			});
			if (data === '收藏' || data === '关注' || data === '同城') {
				console.log('data匹配成功:', data);
				this.listsDtada = [];
			}
		},
		listsClick(item, i) {
			// console.log(item);
			let id, name;
			id = item.id;
			name = item.name;
			// console.log(id,name);
			uni.navigateTo({
				url: `../../pages/listsdata/listsdata?id=${id}&name=${name}`
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
					console.log(res.windowHeight);
					this.windowHeight.height = res.windowHeight - 200 - 48 + 'px';
					// #endif
					// #ifndef APP-PLUS
					this.windowHeight.height = res.windowHeight - 150 - 48 + 'px';
					// #endif
					console.log(this.windowHeight.height);
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
		this.getData();
		this.getViewSize(); // 获取初始视图大小
		this.registerResizeEvent(); // 注册窗口变化事件
	}
};
</script>

<style scoped>
.aside {
	height: 50px;
}

.flex {
	display: flex;
}

.buttons {
	width: 100%;
	background-color: #ecf0f1;
	border-radius: 0;
}
.buttons::after {
	border: 0;
	border-radius: 0;
}
.active {
	background-color: #e74c3c;
	color: aliceblue;
}
.kuan {
	width: 100%;
}

.paddbuttom {
	position: fixed;
	bottom: 0;
}
.scroll-Y {
	height: 300rpx;
}
</style>
