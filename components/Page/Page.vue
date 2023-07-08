<template>
	<view>
		<view class="flex">
			<button ref="buttons" class="buttons" v-for="(item, index) in tabs" :key="index" @click="button(index, item)" :class="{ active: activeButton === index }">
				{{ item }}
			</button>
		</view>
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
						@click="listsClick(item,i)"
					/>
				</uni-list>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabs: ['全部', '热门', '喜欢', '关注', '同城'],
			listsDtada: [],
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
					// console.log(res.data);
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
			if (data === '喜欢' || data === '关注' || data === '同城') {
				console.log('data匹配成功:', data);
				this.listsDtada = [];
			}
		},
		listsClick(item,i) {
			// console.log(item);
			let id,name;
			id=item.id;
			name=item.name;
			// console.log(id,name);
			uni.navigateTo({
				url: `../../pages/listsdata/listsdata?id=${id}&name=${name}`
			});
		}
	},
	mounted() {
		this.getData();
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
</style>
