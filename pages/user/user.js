const app = getApp();
const config = require('../../config/config.js');
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
    // {
    //   id: 2,
    //   iconClass: 'icon-resume',
    //   title: '我的简历',
    //   router: ''
    // }, 
    {
      id: 3,
      iconClass: 'icon-customer',
      title: '联系客服',
      router: ''
    }, {
      id: 4,
      iconClass: 'icon-about',
      title: '关于我们',
      router: ''
    }, {
      id: 5,
      iconClass: 'icon-opinion',
      title: '意见反馈',
      router: ''
    }],
    isLogin: false,
    userName: '',
    icon: '',
    userId: 1
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
        id: this.data.userId,
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
      if (e.currentTarget.dataset.id == 1 || e.currentTarget.dataset.id == 2) {
        app.showInfo('请先登录')
      } else if (e.currentTarget.dataset.id == 3) {
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
      } else if (e.currentTarget.dataset.id == 3) {
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
      url: '/pages/editUser/editUser',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    try {
      app.checkLogin();
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
      };
    } catch (e) {

    }


  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})