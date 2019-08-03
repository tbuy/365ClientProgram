const apiPath = require('../../config/apiPath.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        id: 1,
        title: "全部",
        isHeightlight: true
      },
      {
        id: 2,
        title: "待确认",
        isHeightlight: false
      },
      {
        id: 3,
        title: "待服务",
        isHeightlight: false
      },
      {
        id: 4,
        title: "待支付",
        isHeightlight: false
      },
    ],
    data: {
      listId: 1,
      list:[
        {
          id: 1,
          title:'保姆',
          time: '2019.04.05 —— 2019.07.04',
          address: '沈阳国际软件园',
          image: ''
        },
        {
          id: 2,
          title: '保姆',
          time: '2019.04.05 —— 2019.07.04',
          address: '沈阳国际软件园',
          image: ''
        }
      ]
    }
  },
  select(e){
    e.currentTarget.dataset.id
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
      // wx.request({
      //   url: apiPath.getOrderList,
      //   method: 'get',
      //   header: {
      //     'Content-Type': 'application/json',
      //     'accessToken': wx.getStorageSync('accessToken')
      //   },
      //   data: {
      //     type: 1,
      //     id: 1,
      //   },
      //   success: (res) => {
      //     if (res.data.code == 0) {
      //       console.log(res.data.message)
      //     }
      //   },
      //   fail: (err) => {
      //     console.log(111, err)
      //   }
      // })
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