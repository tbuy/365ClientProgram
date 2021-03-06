const request = require('../../request/request.js');
const apiPath = require('../../config/apiPath.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [],
    selectedIndex: 0,
  },
  getMenuList() {
    wx.showNavigationBarLoading()
    wx.showLoading()
    wx.request({
      url: apiPath.getCategoryTree,
      method: 'get',
      header: {
        'Content-Type': 'application/json',
      },
      data: {},
      success: (res) => {
        if (res.data.code == 0) {
          let _menuList = res.data.data;
          _menuList.map((item, index) => {
            if (index == 0) {
              item.isSelected = true
            } else {
              item.isSelected = false
            }
            return item;
          })
          this.setData({
            menuList: _menuList
          })
        }
      },
      fail: (err) => {
        app.showInfo(res.data.message)
      },
      complete: () => {
        wx.hideLoading()
        wx.hideNavigationBarLoading()
      }
    })
  },
  toggle(e) {
    let _menuList = this.data.menuList;
    _menuList.forEach((item, index) => {
      if (index == e.currentTarget.dataset.index) {
        item.isSelected = true;
        this.setData({
          selectedIndex: index
        })
      } else {
        item.isSelected = false;
      }
    })
    this.setData({
      menuList: _menuList
    })
  },
  goContent(e) {
    if (e.currentTarget.dataset.id) {
      wx.navigateTo({
        url: "/pages/classifyContent/classifyContent?id=" + e.currentTarget.dataset.id,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
        this.getMenuList()
    } catch (e) {

    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onTabItemTap(item) {
    this.getMenuList()
  }
})