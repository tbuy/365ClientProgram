const apiPath = require('./config/apiPath.js');
App({
  onLaunch: ()=> {
    
  },
  //消息框
  showInfo: (title = "error", icon = "none")=>{
    wx.showToast({
      title: title,
      icon: icon,
      duration: 1500,
      mask: true

    })
  },
  /**
   * 登录
   * phone 手机号
   * captcha 验证码
   * callback 成功的回调函数
   */
  globalLogin(phone, captcha, callback = () => {}) {
    wx.login({
      success: (loginRes) => {
        console.log('loginRes', loginRes)
        if (loginRes.code) {
          /**
           * 获取用户信息(用户已经授权的情况下才能调用)
           * 
           */
          wx.getUserInfo({
            withCredentials: false,
            success: (infoRes) => {
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
                  rawData: infoRes.rawData,
                  signature: infoRes.signature,
                  encryptedData: infoRes.encryptedData,
                  iv: infoRes.iv
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
            },
            fail: (err) => {
              //获取用户信息失败，检查是否未开启权限
              wx.hideLoading();
              this.checkUserInfoPermission();
              console.log(222, err)
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
  checkLogin(){
    if (wx.getStorageSync('accessToken')) {
      // 检查 session_key 是否过期
      wx.checkSession({
        // session_key 未过期
        success: ()=> {
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
        fail: ()=> {
          return false;
        }
      });
    } else {
      return false;
    }

  },
  //检查是否开启权限
  checkUserInfoPermission(callback = () => {}) {
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
    userInfo: null
  }

})