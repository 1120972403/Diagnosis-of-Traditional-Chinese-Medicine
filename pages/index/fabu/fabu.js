
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgList: ''
  },

  formSubmit: function (e) {
    var that = this
    console.log(e)
    var uid = wx.getStorageSync('uid')
    wx.uploadFile({
      url: 'http://47.101.209.52:9999/wx/upload',
      filePath: this.data.imgList,
      name: 'file',
      formData: {
        'openID': uid.openid,
        'message': e.detail.value.opinion,
        type:2
      },
      success(res) {
        // wx.showLoading({
        //   title: '识别中',
        //   mask: true
        // });
        console.log("返回过来的信息" + res.data)
      },
      error: function () {
        wx.showToast({
          title: '服务器失败',
          icon: 'none'
        })
        return
      }
    })
  },
  /**
   * 上传图片
   */
  ChooseImage() {
    var that =this
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      // success: function (res) {
      //   var imgList = res.tempFilePaths
      //   console.log(imgList[0])
      //   that.setData({
      //     imgList: imgList[0]
      //   })
      // }
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList
              .concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '召唤师',
      content: '确定要删除这段回忆吗？',
      cancelText: '再看看',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
})
