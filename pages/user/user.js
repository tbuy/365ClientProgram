const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    icon:''
  },
  //获取用户信息
  bindGetUserInfo(e) {
    if (e.detail.encryptedData) {
      app.globalGetUserInfo(e)
      wx.navigateTo({
        url: '/pages/mobileLogin/mobileLogin',
      })
    }else{
      app.showInfo('您已拒绝授权，请重新点击并登录')
    }
  },
  //跳页
  goItem(e) {
    if (this.data.isLogin){
      if (e.currentTarget.dataset.router) {
        wx.navigateTo({
          url: e.currentTarget.dataset.router,
        })
      } else {
        app.showInfo('敬请期待')
      }
    }else{
      app.showInfo('请先登录')
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
    try{
      app.checkLogin();
      if (wx.getStorageSync('isLogin')) {
        this.setData({
          isLogin: wx.getStorageSync('isLogin')
        })
        let _userInfo = JSON.parse(wx.getStorageSync('userInfo'))
        this.setData({
          userName: _userInfo.name || _userInfo.phone,
          icon: _userInfo.icon
        })
        console.log(_userInfo)

      };
    }catch(e){

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