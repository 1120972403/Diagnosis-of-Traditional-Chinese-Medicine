Page({
  data: {
    ok: {},
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    nickname:''
  },

  //微信登陆
  bindGetUserInfo: function() {
    var that = this;
    var name = "";
    var avatarUrl = "";
    wx.getUserInfo({
      success: function(res) {
        console.log(res)
        wx.setStorageSync('userInfo', res.userInfo)
        name = res.userInfo.nickName;
        avatarUrl = res.userInfo.avatarUrl;
      }
    })
    wx.login({
      success(res) {
        var that = this;
        console.log("res.code：" + res.code)
        if (res.code) {
          wx.request({
            url: 'http://47.101.209.52:9999/wx/login',
            method: "POST",
            data: {
              nickName: name,
              code: res.code,
              avatarUrl: avatarUrl
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
            },
            success: function(res) {
              var openid=res.data
              wx.switchTab({
                url: '/pages/plant/plant',
              })
              console.log(res.data)
              wx.setStorageSync('uid', openid);

            }

          })
        } else {
          console.log("未获取到code")
        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
})