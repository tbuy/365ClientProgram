const request = require('../../request/request.js');
const apiPath = require('../../config/apiPath.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      id: 1,
      title: '我的地址',
      router: '/pages/myAddress/myAddress'
    }, {
      id: 2,
      title: '我的订单',
      router: '/pages/myOrder/myOrder'
    }, {
      id: 3,
      title: '我的合同',
      router: ''
    }, {
      id: 4,
      title: '联系客服',
      router: ''
    }, {
      id: 5,
      title: '关于我们',
      router: ''
    }],
    isLogin: false,
    userName: '宋同学'
  },
  login() {
    if (this.data.isLogin) {
      return false;
    }
    wx.navigateTo({
      url: '/pages/mobileLogin/mobileLogin',
    })
  },
  goItem(e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.router,
    })

  },
  logout(){
    wx.navigateTo({
      url: '/pages/logout/logout',
    })
  },
  edit(){
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
    console.log(wx.getStorageSync('userToken'))
    // if (wx.getStorageSync('userToken')) {

    //   let _data = {
    //     id: wx.getStorageSync('userToken').id,
    //   }
    //   request.request(apiPath.getUser, 'GET', _data).then(val => {

    //     console.log(val.data)
    //   }).catch(e => {
    //     console.log(222)
    //     throw Error
    //   })

    //   this.setData({
    //     isLogin: true
    //   })
    // }
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