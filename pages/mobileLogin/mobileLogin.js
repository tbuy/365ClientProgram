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
    let regPhone = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
    if (!regPhone.test(e.detail.value.phone)) {
      app.showInfo('请输入正确手机号')
    } else if (e.detail.value.captcha == '' || e.detail.value.captcha < 6) {
      app.showInfo('请输入正确验证码')
    } else {
      // app.globalLogin(e.detail.value.phone, e.detail.value.captcha, () => {
      //   app.showInfo('登录成功')
      //   wx.reLaunch({
      //     url: "/pages/user/user"
      //   })
      // })
      app.globalLogin(17602458800, 111111,()=>{
        app.showInfo('登录成功')
        wx.reLaunch({
          url: "/pages/user/user"
        })
      })
    }
  },
  getCode() {
    if (this.data.isShowTime) {
      return false;
    }
    return request.request(apiPath.getCaptcha, 'GET', { phone: this.data.phone }).then(val => {
      app.showInfo(val.message)
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
      app.showInfo(val.message)
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

})