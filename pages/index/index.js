const app = getApp();
const apiPath = require('../../config/apiPath.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播位
    adBanner: [],
    //中间广告位
    adMiddle: [],
    //推荐广告位
    adRecommend1: [],
    adRecommend2: [],
    //轮播点
    indicatorDots: true,
    autoplay: true,
    //时间间隔
    interval: 3000,
    //滑动时长
    duration: 400,
    videoContext: '',
    //导航
    navContent: [{
      image: '/images/nav-home1.png',
      name: '新人专享',
      router: ''
    },
    {
      image: '/images/nav-home2.png',
      name: '家电清洗',
      router: ''
    },
    {
      image: '/images/nav-home3.png',
      name: '金牌保姆',
      router: ''
    },
    {
      image: '/images/nav-home4.png',
      name: '精彩视频',
      router: ''
    }
    ],
    adPosition: null

  },
  goItem(e) {
    if (e.currentTarget.dataset.router) {
      wx.navigateTo({
        url: 'e.currentTarget.dataset.router',
      })
    } else {
      app.showInfo('敬请期待')
    }
  },
  //获取广告位
  getAdPosition() {
    wx.request({
      url: apiPath.getAdPosition,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      success: (res) => {
        if (res.data.code == 0) {
          let _data = res.data.data;
          this.setData({
            adPosition: _data,
            adBanner: _data['S000001']['resource'],
            adMiddle: _data['S000002']['resource'],
            adRecommend1: _data['S000003']['resource'],
            adRecommend2: _data['S000004']['resource']
          })
          wx.setStorageSync('adPosition', JSON.stringify(_data));
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      }
    })
  },
  goAdPositionContent(e) {
    if (e.currentTarget.dataset.item) {
      app.goAdPositionContent(e.currentTarget.dataset.item)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAdPosition()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')


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