<template>
<div class="container">
    <div class="user">
        <div class="image">
            <img :src="avatar" alt="">
        </div>
        <div class="login">
            <div>请登录</div>
        </div>
    </div>
    <div class="list">
        <div class="item" v-for="item in 4" :key="item.id">
            <i class="iconfont">111</i>
            <span class="fl">kkk</span>
            <!-- <img src="../../../static/images/enter.png" alt="" class="fr"> -->
        </div>
    </div>
</div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'
import avatar from '../../../static/images/avatar.png'
export default {
  components: {
  },

  data () {
    return {
        avatar: avatar,
        orderMenu: [
            {}
        ]
    }
  },

  created () {

  }
}
</script>

<style scoped lang="scss">
.user {
    width: 100%;
    background-color: #fff;
    border-radius: 10rpx;
    display: flex;
    padding: 60rpx;
    box-sizing: border-box;
    .image{
        width: 120rpx;height: 120rpx;
        background-color: #f8f8f8;
        overflow: hidden;
        border-radius: 50%;
        margin-right: 40rpx;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .login {
        line-height: 120rpx;
        font-size: 32rpx;
    }
}
.list {
    width: 100%;
    height: 500rpx;
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 30rpx;
}
</style>
