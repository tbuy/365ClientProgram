const request = require('../../request/request.js');
const apiPath = require('../../config/apiPath.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [],
    selectedIndex: 0
  },
  getMenuList() {
    wx.showNavigationBarLoading()

    wx.request({
      url: apiPath.getCategoryTree,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: (res) => {
        if (res.data.code == 0) {
          let _menuList = res.data.data;
          _menuList.map((item, index) => {
            if (index == 0) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
            return item;
          })
          this.setData({
            menuList: _menuList
          })
          wx.hideNavigationBarLoading()
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      }
    })
  },
  toggle(e) {
    let _menuList = this.data.menuList;
    _menuList.forEach((item, index) => {
      if (index == e.currentTarget.dataset.index) {
        item.isSelected = true;
        this.setData({
          selectedIndex: index
        })
      } else {
        item.isSelected = false;
      }
    })
    this.setData({
      menuList: _menuList
    })
  },
  goContent(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: "/pages/classifyContent/classifyContent?id=" + e.currentTarget.dataset.id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
        this.getMenuList()
    } catch (e) {

    }
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