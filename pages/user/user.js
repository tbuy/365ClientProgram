const app = getApp();
const config = require('../../config/config.js');
const apiPath = require('../../config/apiPath.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      id: 1,
      iconClass: 'icon-order',
      title: '我的订单',
      router: '/pages/myOrder/myOrder'
    }, 
    {
      id: 2,
      iconClass: 'icon-customer',
      title: '联系客服',
      router: ''
    }, {
      id: 3,
      iconClass: 'icon-about',
      title: '关于我们',
      router: ''
    }, {
      id: 4,
      iconClass: 'icon-opinion',
      title: '意见反馈',
      router: ''
    }],
    isLogin: false,
    userName: '',
    icon: '',
    userId: 0
  },
  //获取信息
  getUser(){
    wx.request({
      url: apiPath.getUser,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
        'accessToken': wx.getStorageSync('accessToken')
      },
      data: {
        id: wx.getStorageSync('userId'),
      },
      success: (res) => {
        if (res.data.code == 0) {
          var _data = res.data.data
          this.setData({
            userName: _data.name || _data.phone,
            icon: _data.icon,
            userId: _data.id
          })
        }
      },
      fail: (err) => {
        console.log(111, err)
      }
    })
  },
  //获取用户信息（登录）
  bindGetUserInfo(e) {
    if (e.detail.encryptedData) {
      app.globalGetUserInfo(e)
      wx.navigateTo({
        url: '/pages/mobileLogin/mobileLogin',
      })
    } else {
      app.showInfo('您已拒绝授权，请重新点击并登录')
    }
  },
  //跳页
  goItem(e) {
    if (!this.data.isLogin) {
      if (e.currentTarget.dataset.id == 1) {
        app.showInfo('请先登录')
      } else if (e.currentTarget.dataset.id == 2 || e.currentTarget.dataset.id == 4) {
        wx.makePhoneCall({
          phoneNumber: config.phone
        })
      } else {
        app.showInfo('敬请期待')
      }
    } else {
      if (e.currentTarget.dataset.router) {
        wx.navigateTo({
          url: e.currentTarget.dataset.router + "?id=" + this.data.userId,
        })
      } else if (e.currentTarget.dataset.id == 2 || e.currentTarget.dataset.id == 4) {
        wx.makePhoneCall({
          phoneNumber: config.phone
        })
      } else {
        app.showInfo('敬请期待')
      }
    }

  },
  //退出登录
  logout() {
    wx.clearStorageSync()
    app.showLoading()
    setTimeout(() => {
      app.hideLoading(0)
      wx.reLaunch({ url: '/pages/user/user' })
    }, 800)
  },
  //编辑资料
  edit() {
    wx.navigateTo({
      url: '/pages/editUser/editUser'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      app.checkLogin();
      if (wx.getStorageSync('isLogin')) {
        this.setData({
          isLogin: wx.getStorageSync('isLogin')
        })
        this.getUser()
      };
  },
  
  onTabItemTap(item) {
    this.getUser()
  }
})