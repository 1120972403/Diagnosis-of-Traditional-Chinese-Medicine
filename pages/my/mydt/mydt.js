// pages/my/mydt/mydt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    getlist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    var uid = wx.getStorageSync('uid')
    wx.request({
      url: 'http://47.101.209.52:9999/wx/getMove',
      data: {
        openID: uid.openid
      },
      success: function(res) {
        console.log(res.data.movements.length)
        if (res.data.movements.length >= 1) {
          that.setData({
            getlist: res.data.movements
          })
        } else {
          wx.showToast({
            title: '亲，您还没有动态哦',
            icon: 'none'
          })
          wx.navigateBack()
        }

      }
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