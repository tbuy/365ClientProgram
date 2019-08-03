const apiPath = require('../../config/apiPath.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    icon: '',
    id: 0,
    phone: ''
  },
  upload(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res)=> {

        this.setData({
          icon: res.tempFilePaths[0]
        })
        wx.request({
          url: apiPath.editIcon,
          method: 'post',
          header: {
            'Content-Type': 'application/json',
            'accessToken': wx.getStorageSync('accessToken')
          },
          data: {
            icon: res.tempFilePaths[0],
            id: this.data.id,
          },
          success: (res) => {
            if (res.data.code == 0) {
              console.log(res.data.message)
            }
          },
          fail: (err) => {
            console.log(111, err)
          }
        })
      }
    })

  },
  save(){
    try{
      wx.request({
        url: apiPath.editUser,
        method: 'post',
        header: {
          'Content-Type': 'application/json',
          'accessToken': wx.getStorageSync('accessToken')
        },
        data: {
          name: this.data.name,
          id: this.data.id,
        },
        success: (res) => {
          if (res.data.code == 0) {

            wx.setStorageSync('userInfo', JSON.stringify({
              name: this.data.name,
              icon: this.data.icon,
              id: this.data.id,
              phone: this.data.phone
            }));

            app.showInfo(res.data.message)
            wx.reLaunch({
              url: "/pages/user/user"
            })
          }

        },
        fail: (err) => {
          console.log(111, err)
        }
      })
    }catch(e){
      
    }
  },
  userNameInput(e) {
    this.setData({
      name: e.detail.value
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
    let _userInfo = JSON.parse(wx.getStorageSync('userInfo'));
    this.setData({
      name: _userInfo.name,
      icon: _userInfo.icon,
      id: _userInfo.id,
      phone: _userInfo.phone
    })
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