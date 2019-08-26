<template>
  <div class="userPage theme_bgColor2 theme_wordSize_smal">
    <div class="topContainer theme_bgColor1">
      <div class="image">
        <!-- <image class="avatar-image public_avatar" src="{{icon||'/images/avatar.png'}}"> -->
      </div>
      <div class="name">
        <button
          v-if="!isLogin"
          open-type="getUserInfo"
          bindgetuserinfo="bindGetUserInfo"
          class="login theme_wordSize_normal"
        >请点击登录</button>
        <div v-else>
          <text class="theme_wordSize_normal">{{ userName }}</text>
          <div class="logout theme_word_small" @click="logout">退出登录</div>
        </div>
      </div>
      <div class="iconfont icon-editor icon-color edit" v-if="isLogin" @click="edit"></div>
    </div>
    <div class="bottomContainer">
      <div
        v-for="item in menuList"
        :key="item.id"
        class="item theme_wordSize_normal"
        @click="goItem"
      >{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
// Use Vuex
import store from "./store";

export default {
  data(){
    return {
       menuList: [ {
      id: 1,
      title: '我的订单',
      router: '/pages/myOrder/myOrder'
    }, {
      id: 2,
      title: '我的合同',
      router: ''
    }, {
      id: 3,
      title: '联系客服',
      router: ''
    }, {
      id: 4,
      title: '关于我们',
      router: ''
    }],
    isLogin: false,
    userName: '',
    icon:'',
    userId: 1
    }
  },
  computed: {

  },
  methods: {
   //获取用户信息
  bindGetUserInfo(e) {
    if (e.detail.encryptedData) {
      // app.globalGetUserInfo(e)
      wx.navigateTo({
        url: '/pages/mobileLogin/mobileLogin',
      })
    }else{
      // app.showInfo('您已拒绝授权，请重新点击并登录')
    }
  },
  //跳页
  goItem(e) {
    if (!this.data.isLogin) {
      if (e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2) {
        // app.showInfo('请先登录')
      } else {
        // app.showInfo('敬请期待')
      }
    } else {
      if (e.currentTarget.dataset.router) {
        wx.navigateTo({
          url: e.currentTarget.dataset.router + "?id=" + this.data.userId,
        })
      } else {
        // app.showInfo('敬请期待')
      }
    }

  },
  //退出登录
  logout() {
    wx.navigateTo({
      url: '/pages/logout/logout',
    })
  },
  //编辑资料
  edit() {
    wx.navigateTo({
      url: '/pages/editUser/editUser',
    })
  },
  },
  mounted(){
          // app.checkLogin();
      if (wx.getStorageSync('isLogin')) {
        this.setData({
          isLogin: wx.getStorageSync('isLogin')
        })
        let _userInfo = JSON.parse(wx.getStorageSync('userInfo'))
        this.setData({
          userName: _userInfo.name || _userInfo.phone,
          icon: _userInfo.icon,
          userId: _userInfo.id
        })
        console.log(_userInfo)
  }
  }}
</script>

<style>
.userPage {
  height: 100vh;
  background-color: #f5f5f5;
}

.topContainer {
  height: 300rpx;
  overflow: hidden;
  display: flex;

}
.image {
  margin-top: 50rpx;
  margin-left: 80rpx;
}
.avatar-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;

}
.login {
  background-color: rgba(0,0,0,0);
  color: #fff;
}
.login:after {
   border: 0 none;
}
.name {
  margin-left: 30rpx;
  margin-top: 60rpx;
  color: #fff;
}
.edit {
  position: absolute;
  right: 60rpx;
  top: 60rpx;
}
.logout {
  margin-top: 20rpx;
  border: 1px solid #f5f5f5;
  color: #f5f5f5;
  width: 140rpx;
  height: 40rpx;
  text-align: center;
  line-height: 40rpx;
  border-radius: 10rpx;
  font-size: 28rpx;
}

.bottomContainer {
  width: 90%;
  background-color: #fff;
  border-radius: 20rpx;
  margin: -80rpx auto;
  padding: 0 50rpx;
  box-sizing: border-box;
}
.item {
  height: 120rpx;
  line-height: 120rpx;
   padding: 0 20rpx;
  box-sizing: border-box;
  border-bottom: 0.1rpx solid #ccc;
}
.item:last-child {
   border-bottom: 0 none;
}
</style>
