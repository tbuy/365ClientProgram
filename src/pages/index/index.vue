<template>
  <div class="container">
      <div class="banner">banner</div>
      <div class="menu">入口</div>
      <div class="ad">广告</div>
      <div class="hot">热门推荐</div>
      <div class="video">视频</div>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {

    }
  },

  components: {
  },

  methods: {

  },

  created () {
  }
}
</script>

<style scoped>
.banner {
    width: 100%;
    height: 300rpx;
    background-color: #fff;
    border-radius: 10rpx;
}
.menu {
    width: 100%;
    height: 160rpx;
    background-color: #fff;
    margin-top: 30rpx;
}
.ad {
    width: 100%;
    height: 200rpx;
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 30rpx;

}
.hot {
    width: 100%;
    height: 200rpx;
    background-color: #fff;
    margin-top: 30rpx;
}
.video {
    width: 100%;
    height: 500rpx;
    background-color: #fff;
    margin-top: 30rpx;
}
</style>
