const apiPath = require('../../config/apiPath.js');
const config = require('../../config/config.js');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //导航
    tab: [{
      name: '列表',
      id: 1,
      isSelected: true
    },
    {
      name: '体验服务',
      id: 2,
      isSelected: false
    }
    ],
    //选中模块
    isShowSelect: true,
    list: [],
    // 分页
    lastId: 0,
    isLast: true,
    pageNumber: 15,
    //轮播
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
    ],
    //轮播点
    indicatorDots: true,
    autoplay: false,
    //时间间隔
    interval: 5000,
    //滑动时长
    duration: 400,
    //轮播高度
    SWIPER_HEIGHT: 200,
    height: '',
    id: 1,
    //表单
    name: '',
    phone: '',
    //是否显示表单
    isShowForm: false,
    //体验服务接口
    imageFile: []
  },
  select(e) {
    if (e.currentTarget.dataset.index == 0) {
      this.setData({
        isShowSelect: true
      })

    } else {
      this.setData({
        isShowSelect: false
      })
    }
    let _tab = this.data.tab
    _tab.map((item, index) => {
      if (index == e.currentTarget.dataset.index) {
        item.isSelected = true
      } else {
        item.isSelected = false
      }
      return item
    })

    this.setData({
      tab: _tab
    })
  },
  getOrderList(lastId) {
    wx.request({
      url: apiPath.getCategoryDetail,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      data: {
        id: this.data.id,
        lastId: lastId,
        pageNumber: this.data.pageNumber,
      },
      success: (res) => {
        if (res.data.code == 0) {
          let _data = res.data.data;
          this.setData({
            list: this.data.list.concat(_data.data),
            lastId: _data.lastId,
            isLast: _data.isLast,
            imageFile: _data.files
          })
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      }
    })
  },
  lower() {
    if (!this.data.isLast) {
      this.getOrderList(this.data.lastId)
    } else {
      app.showInfo('没有更多')
    }

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
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight - 60
        })
      }
    })

    this.setData({
      id: options.id
    })

    this.getOrderList(0)
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