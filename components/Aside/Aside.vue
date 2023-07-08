<template>
	<view>
		<!-- #ifdef H5 -->
		<video autoplay loop muted controls="false" show-play-btn="false" show-fullscreen-btn="false" object-fit="fill" src="/static/video/Gokao.mp4"></video>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<image class="imge" src="/static/image/R-C.jpg" mode=""></image>
		<!-- #endif -->
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style scoped>
video {
	height: 200px;
}
.imge{
	width: 750rpx;
	height: 150px;
}
/* #ifndef APP-PLUS */
video {
	min-width: 750rpx;
}

/* #endif */

/* #ifdef H5 */
video {
	min-width: 100vw;
}
/* #endif */
</style>
