// pages/plant/plant.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    testPicFile: '',
    userInfo: [],
    result:[],
  },
//弹出框
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  //识别推荐的
  tuijian: function() {
    wx.navigateTo({
      url: '/pages/plant/tuijian/tuijian',
    })
  },
  selectimg: function() {
    let that = this;
    var uid = wx.getStorageSync('uid')
    wx.chooseImage({
      // count: 1,
      // sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths[0])
        that.setData({
          testPicFile: tempFilePaths[0]
        })
        wx.uploadFile({
          url: 'http://47.101.209.52:9999/wx/upload',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            openID: uid.openid
          },
          success: function(res) {
            console.log(res.data)
            var result = JSON.parse(res.data);
            //输出返回过来的名字
            console.log(result['result']);
            // console.log('查看' + result['result'])
            if (result['result'] == "非植物") {
              wx.showToast({
                title: '该图像不属于中草药',
                icon: 'none'
              })
              that.setData({
                testPicFile: ''
              })
            } else {
              //进行信息读取，有信息看看是不是数据库已有的，若没有则不进行推荐
              wx.request({
                url: 'http://47.101.209.52:9999/wx/getMed',
                data: {
                  name: result['result']
                },
                success: function(res) {
                  console.log(res.data)
                  if (res.data.medicine == null){
                    // wx.showToast({
                    //   title: result['result'],
                    //   icon: 'none'
                    // })
                    wx.showModal({
                      title: '识别成功',
                      content: result['result'],
                      // success(res) {
                      //   if (res.confirm) {
                      //     console.log('用户点击确定')
                      //   } else if (res.cancel) {
                      //     console.log('用户点击取消')
                      //   }
                      // }
                    })
                    
                    that.setData({
                      testPicFile: ''
                    })
                  }
                  else{
                    console.log('传值' + result['result'])
                    wx.navigateTo({
                      url: '/pages/plant/result/result?name=' + result['result'],
                    })
                  }

                }
              })
            }



          }
        })
      }
    })
  },

  takePhoto() {
    let that = this;
    var uid = wx.getStorageSync('uid')
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        console.log("拍摄成功")
        var tempImagePath = res.tempImagePath
        this.setData({
          testPicFile: res.tempImagePath
        })

        wx.uploadFile({
          url: 'http://47.101.209.52:9999/wx/upload',
          filePath: tempImagePath,
          name: 'file',
          formData: {
            openID: uid.openid
          },
          success: function(res) {
            console.log(res.data)
            var result = JSON.parse(res.data);
            if (result = "非植物") {
              wx.showToast({
                title: '该图像不属于中草药',
                icon: 'none'
              })
              that.setData({
                testPicFile: ''
              })
            } else {
              //进行信息读取，有信息看看是不是数据库已有的，若没有则不进行推荐
              wx.request({
                url: 'http://47.101.209.52:9999/wx/getMed',
                data: {
                  name: result['result']
                },
                success: function (res) {
                  console.log(res.data)
                  if (res.data.medicine == null) {
                    // wx.showToast({
                    //   title: result,
                    //   content: result,
                    //   icon: 'none'
                    // })
                    wx.showModal({
                      title: '识别成功',
                      content: result['result'],
                      // success(res) {
                      //   if (res.confirm) {
                      //     console.log('用户点击确定')
                      //   } else if (res.cancel) {
                      //     console.log('用户点击取消')
                      //   }
                      // }
                    })
                    that.setData({
                      testPicFile: ''
                    })
                  }
                  else {
                    console.log('传值' + result['result'])
                    wx.navigateTo({
                      url: '/pages/plant/result/result?name=' + result['result'],
                    })
                  }

                }
              })
            }
          }
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
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
var that = this
    that.setData({
      testPicFile: ''
    })

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