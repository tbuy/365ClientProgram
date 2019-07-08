
const apiPath = require("../config/apiPath.js");

const request = (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'Content-Type': 'application/json',
        'X-Nideshop-Token': wx.getStorageSync('userToken')
      },
      success(res) {
        if (res.statusCode == 200){
          if (res.data.code == 0) {
            resolve(res.data)
          } else {
            reject(res.data)
          }
        }else{
          reject(res.errMsg);
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

Promise.prototype.finally = function (callback) {
  var Promise = this.constructor;
  return this.then(
    function (value) {
      Promise.resolve(callback()).then(
        function () {
          return value;
        }
      );
    },
    function (reason) {
      Promise.resolve(callback()).then(
        function () {
          throw reason;
        }
      );
    }
  );
}

//检验是否登录
function loginCheck(pageObj) {
  if (pageObj.onLoad) {
    let _onLoad = pageObj.onLoad;

    pageObj.onLoad = (options) => {
      if (wx.getStorageSync('userToken')) {
        // 获取当前页面
        let currentPages = getCurrentPages();
        let currentInstance = currentPages[currentPages.length - 1]

        _onLoad.call(currentInstance, options);

      } else {
        
        wx.redirectTo({
          url: "/pages/mobileLogin/mobileLogin"
        });
      }
    }
  }
  return pageObj;
}
module.exports = {
  request,
  apiPath,
  loginCheck

} 