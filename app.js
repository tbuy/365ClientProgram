const apiPath = require('./config/apiPath.js');
App({
  onLaunch: () => {

  },
  //消息框
  showInfo: (title = "error", icon = "none") => {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 1500,
      mask: true

    })
  },
  //获取用户授权信息
  globalGetUserInfo(e) {
    this.globalData.detail = e.detail
  },
  /**
   * 登录
   * phone 手机号
   * captcha 验证码
   * callback 成功的回调函数
   */
  globalLogin(phone, captcha, callback = () => { }) {
    wx.login({
      success: (loginRes) => {
        console.log('loginRes', loginRes)
        if (loginRes.code) {

          /**
           * 服务器登录接口
           * phone 手机号
           * captcha 验证码
           * code 临时登录凭证
           * rawData 用户非敏感信息
           * signature 签名
           * encryptedData 用户敏感信息
           * iv 解密算法的向量
           */
          wx.request({
            url: apiPath.login,
            method: 'post',
            data: {
              phone: phone,
              captcha: captcha,
              code: loginRes.code,
              rawData: this.globalData.detail.rawData,
              signature: this.globalData.detail.signature,
              encryptedData: this.globalData.detail.encryptedData,
              iv: this.globalData.detail.iv
            },
            success: (res) => {
              if (res.data.code == 0) {
                this.globalData.userInfo = res.data.data;
                wx.setStorageSync('userInfo', JSON.stringify(res.data.data));
                wx.setStorageSync('accessToken', JSON.stringify(res.data.data.access_token));
                callback();
              }

              this.showInfo(res.data.message)
            },
            fail: (err) => {
              this.showInfo('登录失败');
              console.log(111, err)
            }
          })

        } else {
          //获取code失败
          this.showInfo('登录失败');
          console.log(333, err)
        }
      },
      fail: (err) => {
        this.showInfo('登录失败');
        console.log(444, err)
      }
    })
  },
  //检查是否登录 登录返回ture 未登录返回false
  checkLogin() {
    if (wx.getStorageSync('accessToken')) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 未过期
        success: () => {
          // 直接从Storage中获取用户信息
          if (wx.getStorageSync('userInfo')) {
            this.globalData.userInfo = JSON.parse(wx.getStorageSync('userInfo'));
            return true;
          } else {
            this.showInfo('缓存信息缺失');
            return false;
          }

        },
        // session_key 过期
        fail: () => {
          return false;
        }
      });
    } else {
      return false;
    }

  },
  //检查是否开启权限
  checkUserInfoPermission(callback = () => { }) {
    console.log(99999)
    //获取用户的当前设置
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          wx.openSetting({
            success: (authSetting) => {
              console.log(authSetting)
            }
          });
        }
      },
      fail: (err) => {
        console.log(err);
      }
    });

  },
  //全局数据
  globalData: {
    //权限详情
    detail: null,
    userInfo: null,

  }

})