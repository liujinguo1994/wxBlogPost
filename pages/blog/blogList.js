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
    isLastPage:false,
    tips:'上拉加载更多',
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
      console.log("teete" + res.data.list)
      console.log("total" + res.data.pages)
      //响应成功
      console.log("响应是否成功:"+res.errno)
      if (res.errno == 0) {
        if(res.data.pages < that.data.page) {
          that.setData({
            isLastPage : true,
            tips : "已显示全部啦",
          })
        }else
        that.setData({
          blogList:that.data.blogList.concat(res.data.list)
        })
        console.log("是否显示全部："+that.data.tips)
        // 追加数据
        console.log(res.data)
      }else{
        app.showError()
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh(){
    this.getIndexData();
    wx.stopPullDownRefresh()
  },
/**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("下拉事件1");
    if(this.data.isLastPage){
      return
    }
    this.setData({
      page: this.data.page + 1
    })
    this.getIndexData()
    console.log("下拉事件2");
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})