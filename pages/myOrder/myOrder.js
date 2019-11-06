const apiPath = require('../../config/apiPath.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        id: 0,
        title: "全部",
        isHeightlight: true
      },
      {
        id: 2,
        title: "已签约",
        isHeightlight: false
      },
      {
        id: 3,
        title: "售后匹配中",
        isHeightlight: false
      },
      {
        id: 4,
        title: "已终止",
        isHeightlight: false
      },
    ],
    selectedId: 0,
    userId: 0,
    list:[],
    // 分页
    lastId: 0,
    isLast: true,
    pageNumber: 4,
    height: '',

  },
  select(e){
    let _tab = this.data.tab;
    _tab.forEach(item=>{
      if (item.id == e.currentTarget.dataset.id){
        item.isHeightlight = true;
      }else{
        item.isHeightlight = false;
      }
    })
    this.setData({
      tab: _tab,
      selectedId: e.currentTarget.dataset.id
    })
    this.getOrderList(0)

  },
  getOrderList(lastId){
    wx.showNavigationBarLoading()

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
          wx.hideNavigationBarLoading()
        },
        fail: (err) => {
          app.showInfo(res.data.message)

        }
      })
  },
  goDetail(e){
    wx.navigateTo({
      url: '/pages/myOrderDetail/myOrderDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  call(e){
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
  onLoad: function (options) {
    this.setData({
      userId: options.id
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