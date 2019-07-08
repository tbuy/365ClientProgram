const request = require('../../request/request.js');

Page(request.loginCheck({

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
      {
        id: 5,
        title: "待评价",
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
}))