// pages/tiaozhan/dati/finish/finish.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
btn:function(){
//1.计算成绩
  var uid = wx.getStorageSync('uid')
  console.log('uid'+uid.openid)
var score = 0;
for(var i=0;i<5;i++){
  if (app.globalData.examAnswer[i].answer == app.globalData.examAnswer[i].select)
  {
    score = score+20;
    console.log("成绩"+score);
  }
  else{
    console.log("成绩" + score);
  }
}
//2.将成绩传到服务器
wx.request({
  url: 'http://47.101.209.52:9999/wx/saveScore',
  data:{
    openID: uid.openid,
    score: score
  },
  success:function(res){
    console.log(res.data)
  }
  
})


  wx.navigateTo({
    url: "/pages/tiaozhan/dati/end/end",
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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