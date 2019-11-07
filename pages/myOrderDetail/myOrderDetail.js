const apiPath = require('../../config/apiPath.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderContent: null
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/myContract/myContract?id=' + e.currentTarget.dataset.id,
    })
  },
  getOrder(id) {
    wx.showNavigationBarLoading()
    wx.showLoading()
    wx.request({
      url: apiPath.getOrder,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
        'accessToken': wx.getStorageSync('accessToken')
      },
      data: {
        id: id,
      },
      success: (res) => {
        if (res.data.code == 0) {
          var _data = res.data.data
          this.setData({
            orderContent: _data,
          })
          console.log(_data)
        }
      },
      fail: (err) => {
        console.log(111, err)
      },
      complete: () => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },
  submit() {
    app.showInfo('敬请期待')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrder(options.id)
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