const apiPath = require('./config/apiPath.js');
App({
  onLaunch: function() {

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
  showModal: (content = "消息框", confirm = () => {}, cancel = () => {}) => {
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
    console.log(e)
    this.globalData.detail = e.detail
  },
  /**
   * 登录
   * phone 手机号
   * captcha 验证码
   * callback 成功的回调函数
   */
  globalLogin(phone, captcha, callback = () => {}) {
    this.showLoading()
    wx.login({
      success: (loginRes) => {
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
                this.globalData.accessToken = res.data.data.access_token
                wx.setStorage({
                  key: "accessToken",
                  data: res.data.data.access_token
                })
                wx.setStorage({
                  key: "userId",
                  data: res.data.data.id
                })
                wx.setStorage({
                  key: "isLogin",
                  data: true
                })
                callback();
              }
              this.showInfo(res.data.message)
            },
            fail: (err) => {
              this.showInfo('登录失败');
            }
          })

        } else {
          //获取code失败
          this.showInfo('登录失败');
        }
      },
      fail: (err) => {
        this.showInfo('登录失败');
      },
      complete: () => {
        this.hideLoading()
      }
    })
  },
  //检查是否登录 登录返回ture 未登录返回false
  checkLogin() {
    var _accessToken = this.globalData.accessToken;
    if (!_accessToken) {
      _accessToken = wx.getStorageSync('accessToken')
      if (_accessToken) {
        this.globalData.accessToken = _accessToken
      } else {
        wx.setStorage({
          key: "isLogin",
          data: false
        })
        return
      }
    }

    // 检查 session_key 是否过期
    wx.checkSession({
      // session_key 未过期
      success: () => {
        wx.setStorage({
          key: "isLogin",
          data: true
        })
      },
      // session_key 过期
      fail: () => {
        wx.setStorage({
          key: "isLogin",
          data: false
        })
        wx.clearStorageSync()
      }
    });

  },

  //获取用户微信信息
  getWxUserInfo(){
    wx.getSetting({
      success: res=>{
        if(res.authSetting['scope.userInfo']){
          wx.getUserInfo({
            success: data=>{
              console.log(data.userInfo)
            }
          })
        }
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
    accessToken: null,
  }

})