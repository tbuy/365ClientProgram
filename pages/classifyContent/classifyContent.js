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
    //广告位
    adImage: [],
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
  goAdPositionContent(e) {
    if (e.currentTarget.dataset.item) {
      app.goAdPositionContent(e.currentTarget.dataset.item)
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
      id: options.id,
      list: [],
      lastId: 0,
      isLast: false,
    })

    this.getOrderList(0)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let _adPosition = JSON.parse(wx.getStorageSync('adPosition'))
    if (_adPosition) {
      this.setData({
        adImage: _adPosition['S000005']['resource'],
      })
    }
  },
})