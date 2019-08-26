<template>
    <div class="swiper">
        <swiper
            :indicator-dots="swiperOption.indicatorDots"
            :autoplay="swiperOption.autoplay"
            :interval="swiperOption.interval"
            :duration="swiperOption.duration"
        >
            <block v-for="item in swiperOption.imgUrls" :key="item.id">
                <swiper-item>
                    <img :src="item" class="slide-image">
                </swiper-item>
            </block>
        </swiper>
    </div>
</template>

<script>
export default {
  props: {
    swiperOption: {
      type: Object,
      default: {
        imgUrls: [
          "https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640",
          "https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640"
        ],
        //轮播点
        indicatorDots: true,
        autoplay: true,
        //时间间隔
        interval: 3000,
        //滑动时长
        duration: 400
      }
    }
  }
};
</script>

<style scoped lang="scss">
.swiper {
  width: 100%;
  height: 320rpx;
  border-radius: 10rpx;
  overflow: hidden;
  & swiper {
    width: 100%;
    height: 320rpx;
  }
  & swiper-item {
    width: 100%;
    height: 320rpx;
  }
  & .slide-image {
    width: 100%;
    height: 320rpx;
    border-radius: 10rpx;
  }
}
</style>
