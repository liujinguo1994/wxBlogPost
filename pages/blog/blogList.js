// pages/blog/blogList.js
const util = require('../../utils/util.js')
const api = require('../../configs/api.js');
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    blogList:[],
    page: 1,
    limit: 10,
    count: 0,
    showPage: false,
    uhide: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getIndexData();
  },

  getIndexData: function(){
    wx.showLoading({
      title: '加载中',
    });
    setTimeout(function(){
      wx.hideLoading()
    },500)
    let that = this;
    util.request(api.BlogListUrl,{
      p:that.data.page
    }).then(function(res){
      if (res.data.total > 0) {
        that.setData({
          blogList: res.data.list,
          showPage: true,
          count: res.data.total
        });
      }
    })
  },
 //点击切换隐藏和显示
 toggleBtn: function (event) { 
  var that = this;
  var toggleBtnVal = that.data.uhide;
  var itemId = event.currentTarget.id; 
  if (toggleBtnVal == itemId) {
    console.log("into"+toggleBtnVal+"_______"+itemId)
    that.setData({
      uhide: 0
    })
  } else {
    console.log("intoEsle"+toggleBtnVal+"_______"+itemId)
    that.setData({
      uhide: itemId
    })
  } 
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
  onPullDownRefresh(){
    this.getIndexData();
    wx.stopPullDownRefresh()
  },
  getBlogList:function(){
    wx.showLoading({
      title: '更新中',
    });
    setTimeout(function(){
      wx.hideLoading({
      },2000)
    })
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