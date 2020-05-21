// pages/blogdetail/blogDetails.js
const util = require("../../utils/util.js")
const api = require("../../configs/api.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:0,
    blogDetails:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    that.setData({
      cid:parseInt(options.cid)
    });
    this.getBlogDetails();

  },

  getBlogDetails: function(){
    wx.showLoading({
      title: '加载中',
    });
    setTimeout(function(){
      wx.hideLoading()
    },500)
    let that = this;
    util.request(api.BlogDetailsUrl,{
      cid:that.data.cid,
    }).then(function(res){
      if(res.data !== null){
        that.setData({
          blogDetails:res.data
        })
      }
      
    })
    
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
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getBlogDetails();
    wx.hideNavigationBarLoading() //完成停止加载
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