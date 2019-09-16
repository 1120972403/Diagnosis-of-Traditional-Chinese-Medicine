// pages/plant/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    xinxi:[],
    what: 'chandi'
  },
  // 产地
  showModal_cd(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 别名
  showModal_bm(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 别名
  showModal_hxcf(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 别名
  showModal_lcyj(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 别名
  showModal_ywbf(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  // 别名
  showModal_ywxz(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  showModal(e) {
    console.log(e)
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options.name)
      var that = this
      //根据传过来的信息进行页面渲染
    wx.request({
      url: 'http://47.101.209.52:9999/wx/getMed',
      data: {
        name: options.name
      },
      success:function(res){
        console.log(res.data)
        that.setData({
          xinxi: res.data.medicine
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