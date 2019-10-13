const apiPath = require('./config/apiPath.js');
App({
  onLaunch: function () {

  },
  //消息框
  showInfo: (title = "error", icon = "none") => {
    wx.showToast({
      title: title,
      icon: icon,
      duration: 800,
      mask: true

    })
  },
  //模态框
  showModal: (content = "消息框", confirm = () => { }, cancel = () => { }) => {
    wx.showModal({
      content: content,
      success(res) {
        if (res.confirm) {
          confirm()
        } else if (res.cancel) {
          cancel()
        }
      }
    })
  },
  //loading
  showLoading: (title = "加载中") => {
    wx.showLoading({
      title: title
    })

  },
  hideLoading: (time = 800) => {
    setTimeout(() => {
      wx.hideLoading()
    }, time)
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
                wx.setStorageSync('accessToken', res.data.data.access_token);
                wx.setStorageSync('userId', res.data.data.id);
                wx.setStorageSync('isLogin', true);
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
            wx.setStorageSync('isLogin', true);
            console.log('已登录')
        },
        // session_key 过期
        fail: () => {
          this.showInfo('缓存信息缺失');
          console.log(2)
          wx.setStorageSync('isLogin', false);
        }
      });
    } else {
      console.log(3)
      wx.setStorageSync('isLogin', false);
    }

  },
  //检查是否开启权限
  checkUserInfoPermission() {
    console.log(99999)
    //获取用户的当前设置
    wx.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userInfo']) {
          wx.openSetting({
            success: (authSetting) => {
              console.log(22, authSetting)
            }
          });
        }
      },
      fail: (err) => {
        console.log(33, err);
      }
    });

  },
  //获取信息
  getUser(){
    wx.request({
      url: apiPath.getUser,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
        'accessToken': wx.getStorageSync('accessToken')
      },
      data: {
        id: this.data.userId,
      },
      success: (res) => {
        if (res.data.code == 0) {
          var _data = res.data.data
          this.setData({
            userName: _data.name || _data.phone,
            icon: _data.icon,
            userId: _data.id
          })
        }
      },
      fail: (err) => {
        console.log(111, err)
      }
    })
  },
  //广告位跳转
  goAdPositionContent(ad) {
    if (ad.jump_type == 1) {
      wx.navigateTo({
        url: '/pages/activity/activity?url=' + ad.activity_url,
      })
    } else {
      wx.navigateTo({
        url: '/pages/classifyContent/classifyContent?id=' + ad.client_category_id,
      })
    }
  },
  //全局数据
  globalData: {
    //权限详情
    detail: null,
  }

})