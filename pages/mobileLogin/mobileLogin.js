const request = require('../../request/request.js');
const apiPath = require('../../config/apiPath.js');
let app = getApp();

Page({
  data: {
    phone: "",
    captcha: "",
    time: 60,
    isShowTime: false,
  },
  formSubmit(e) {
    app.showInfo('111')
    if (e.detail.value.phone == '') {
      app.showInfo('请输入手机号')
    } else if (e.detail.value.captcha == '') {
      app.showInfo('请输入验证码')
    } else {
      // app.globalLogin(e.detail.value.phone, e.detail.value.captcha)
      app.globalLogin(17602458800, 111111)

    }
  },
  getCode() {
    if (this.data.isShowTime) {
      return false;
    }
    return request.request(apiPath.getCaptcha, 'GET', { phone: this.data.phone }).then(val => {
      wx.showToast({
        title: val.message,
        icon: '',
        duration: 2000
      })
      this.setData({
        isShowTime: true
      })
      let oldTime = (new Date()).getTime();
      let newTime,
        time,
        timer;
      timer = setInterval(() => {
        newTime = (new Date()).getTime();
        time = Math.round((newTime - oldTime) / 1000);
        if (time < 60) {
          this.setData({
            time: 60 - time,
          })
        } else {
          clearInterval(timer);
          this.setData({
            time: 60,
            isShowTime: false
          })
        }
      }, 500)
    }).catch(val => {
      wx.showToast({
        title: val.message,
        icon: '',
        duration: 2000
      })
    })
  },
  phoneInput(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  captchaInput(e) {
    this.setData({
      captcha: e.detail.value
    })
  },
  login() {
    wx.showLoading({
      title: '加载中',
    })
    return new Promise((resolve, reject) => {
      request.request(apiPath.login, 'POST', { phone: this.data.phone, captcha: this.data.captcha }).then(val => {
        wx.showToast({
          title: val.message,
          icon: '',
          duration: 2000
        })
        wx.setStorageSync('userToken', {
          access_token: val.data.access_token,
          refresh_token: val.data.refresh_token,
          id: val.data.id
        })
        wx.switchTab({
          url: "/pages/user/user"
        })
      }).catch(val => {
        wx.showToast({
          title: val.message,
          icon: '',
          duration: 2000
        })
      })
    }).finally(() => {
      wx.hideLoading()
    })
  }
})