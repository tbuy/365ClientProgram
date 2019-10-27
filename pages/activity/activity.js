const apiPath = require('../../config/apiPath.js');
const config = require('../../config/config.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    //表单
    name: '',
    phone: '',
    //是否显示表单
    isShowForm: false,
  },
  advisory() {
    this.setData({
      isShowForm: true
    })

  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  nameInput(e) {
    this.setData({
      name: e.detail.value
    })
  },
  close() {
    this.setData({
      isShowForm: false,
      name: '',
      phone: ''
    })
  },
  formSubmitSuccess(e) {
    let regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (!regPhone.test(e.detail.value.phone)) {
      app.showInfo('请输入正确手机号')
    } else {
      wx.showNavigationBarLoading()
      wx.request({
        url: apiPath.submitRequire,
        method: 'post',
        header: {
          'Content-Type': 'application/json',
        },
        data: {
          name: e.detail.value.name,
          phone: e.detail.value.phone,
        },
        success: (res) => {
          if (res.data.code == 0) {
            wx.navigateTo({
              url: '/pages/success/success'
            })
            this.close()
            wx.hideNavigationBarLoading()
          }
        },
        fail: (err) => {
          app.showInfo(res.data.message)
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      url: options.url
    })
  },



})