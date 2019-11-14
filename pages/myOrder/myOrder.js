const apiPath = require('../../config/apiPath.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab: [{
        id: 0,
        title: "全部",
      },
      {
        id: 2,
        title: "已签约",
      },
      {
        id: 3,
        title: "售后匹配中",
      },
      {
        id: 4,
        title: "已终止",
      },
    ],
    selectedId: 0,
    userId: 0,
    list: [],
    // 分页
    lastId: 0,
    isLast: true,
    pageNumber: 4,
    height: '',

  },
  selected(e) {
    this.setData({
      selectedId: e.detail.selectId
    })
    this.getOrderList(0)
  },
  getOrderList(lastId) {
    wx.showNavigationBarLoading()
    wx.showLoading()

    wx.request({
      url: apiPath.getOrderList,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
        'accessToken': wx.getStorageSync('accessToken')
      },
      data: {
        type: this.data.selectedId,
        id: this.data.userId,
        lastId: lastId,
        pageNumber: this.data.pageNumber
      },
      success: (res) => {
        if (res.data.code == 0) {
          var _data = res.data.data
          this.setData({
            list: this.data.list.concat(_data.data),
            isLast: _data.isLast,
            lastId: _data.lastId
          })
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)

      },
      complete: () => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },
  goDetail(e) {
    wx.navigateTo({
      url: '/pages/myOrderDetail/myOrderDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  call(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone
    })
  },
  upper(e) {
    wx.startPullDownRefresh()
  },
  lower() {
    if (!this.data.isLast) {
      this.getOrderList(this.data.lastId)
    } else {
      app.showInfo('没有更多')
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      userId: options.id,
      list: [],
      lastId: 0,
      isLast: false,
    })
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight
        })
      }
    })

    this.getOrderList(0)
  },

})