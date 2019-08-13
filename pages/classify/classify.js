const request = require('../../request/request.js');
const apiPath = require('../../config/apiPath.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      id: 1,
      isSelected: true,
      name: '热门',
      children: [{
        id:4,
        name: 'hh'
      }, {
          id: 6,
        name: 'eeeeee'
      }, {
        id:19,
        name: 'tttt'
      }]
    }, {
      id: 2,
      isSelected: false,
      name: '家政',
      children: [{
        id: 33,
        name: 'ewrw'
      }], 
    }],
    selectedIndex: 0
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
  goContent(e){
    if (e.currentTarget.dataset.id){
      wx.navigateTo({
        url: "/pages/classifyContent/classifyContent",
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    return request.request(apiPath.getCategoryTree, 'GET', {}).then(val => {
      let _menuList = val.data;
      _menuList.map((item,index)=>{
        if(index == 0){
          item.isSelected = true
        }else{
          item.isSelected = false
        }
        return item;
      })
      this.setData({
        menuList: _menuList
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})