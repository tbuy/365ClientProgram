<template>
    <div class="classify">
        <!-- <div class="leftMenu">
            <div
                v-for="item in menuList"
                :key="item.id"
                class="menuItem theme_wordSize_small {{}}"
                :class="{'item-active':item.isSelected}"
                @click="toggle"
            >{{item.name}}</div>
        </div>
        <div class="rightContent">
            <div class="image">
                <img src="https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640">
            </div>
            <div class="item" v-if="menuList[selectedIndex].children">
                <div
                    v-for="item in menuList[selectedIndex].children"
                    :key="item.id"
                    class="itemName theme_wordSize_small"
                    @click="goContent"
                >{{item.name}}</div>
                <div v-for="item in 2" :key="item.id" class="itemName" style="height: 0"></div>
            </div>
        </div>-->
    </div>
</template>

<script>
import apiPath from "@/biz/apiPath";

export default {
  data() {
    return {
      menuList: [],
      selectedIndex: 0
    };
  },
  components: {},

};
</script>

<style scoped lang="scss">
.classify {
  display: flex;
}
.leftMenu {
  width: 30%;
  background-color: #f8f8f8;
  overflow-y: auto;
  height: 100vh;
}
.menuItem {
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
}
.item-active {
  background-color: #fff;
  color: #ff7832;
  border-left: 8rpx solid #ff7832;
}
.rightContent {
  width: 80%;
  padding: 20rpx;
  box-sizing: border-box;

  overflow-y: auto;
  height: 100vh;
}
image {
  width: 100%;
  height: 140rpx;
  background-color: pink;
  border-radius: 10rpx;
}
.item {
  width: 100%;
  display: flex;
  margin-top: 40rpx;
  flex-wrap: wrap;
  justify-content: space-between;
}
.itemName {
  height: 70rpx;
  line-height: 70rpx;
  width: 160rpx;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 10rpx;
  margin-bottom: 20rpx;
}
</style>
