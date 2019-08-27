
var Fly = require("flyio/dist/npm/wx")

const request = new Fly()

request.interceptors.request.use((request) => {
    wx.showLoading({
        title: '加载中..'
    })
    wx.showNavigationBarLoading()
    return request
})

request.interceptors.response.use(
    (response, promise) => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
        return promise.resolve(response.data)
    },
    (err, promise) => {
        wx.hideNavigationBarLoading()
        wx.showToast({
            title: err.message,
            icon: 'none',
            duration: 1000
        })
        return promise.resolve()
    }
)

export default request
