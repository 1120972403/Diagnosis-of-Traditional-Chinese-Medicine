// pages/tiaozhan/dati/end/end.js
var app = getApp();
//题目信息利用缓存
//选择的答案用全局变量
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: [1, 2, 3, 4, 5],
    indicatorDots: true,
    questionList: [],
    userselect: []

  },
  next:function(){
    wx.switchTab({
      url: '/pages/tiaozhan/tiaozhan',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      questionList: wx.getStorageSync('questionList'), //获取缓存中的题目信息
      userselect: app.globalData.examAnswer //获取缓存中的选择答案信息
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