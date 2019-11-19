<template>
<div class="container">
    <div class="header">name</div>
    <div class="list">list</div>
</div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'

export default {
  components: {
  },

  data () {
    return {

    }
  },

  created () {

  }
}
</script>

<style scoped>
.header {
    width: 100%;
    height: 300rpx;
    background-color: #fff;
    border-radius: 10rpx;
}
.list {
    width: 100%;
    height: 500rpx;
    background-color: #fff;
    border-radius: 10rpx;
    margin-top: 30rpx;
}
</style>
