const apiPath = require('../../config/apiPath.js');
const config = require('../../config/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[{
      id: 1,
      icon:'',
      name:'李阿姨',
      age: 49,
      experiences: 3,//工作经验
      native: '沈阳',//籍贯
      isRecommend: false,//是否推荐
      mark:['做饭','打扫卫生','照顾老人'],//标签
      remark:''//备注
    }],
    //轮播
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    ],
    //轮播点
    indicatorDots: true,
    autoplay: false,
    //时间间隔
    interval: 5000,
    //滑动时长
    duration: 400,
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