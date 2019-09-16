var app = getApp();
Page({
  data: {
    multiIndex: [{
      checked: false
    }, {
      checked: false
    }, {
      checked: false
    }],
    index: 0,
    questionList: {}
  },
  radioChange: function(e) {
    console.log(e)
    console.log("用户答案" + e.detail.value)

    //用户选择的答案传递给exam方法
    wx.setStorageSync('result', e.detail.value)

  },
  //下一题
  next: function() {
    //1.获取用户选择的选项
    var userAnswer = wx.getStorageSync('result');
    //2.获取正确答案
    var rightAnswer = this.data.questionList[this.data.index].answer;
    console.log("正确答案" + rightAnswer)
    //3.将用户当前解答的考题答案储到全局变量中
    app.globalData.examAnswer[this.data.index].select = userAnswer;
    app.globalData.examAnswer[this.data.index].answer = rightAnswer;
    console.log("缓存的答案" + app.globalData.examAnswer[2].answer)
    var currPage = this
    console.log(currPage.data.index)
    var currIndex = currPage.data.index + 1;
    if (currIndex <5) {
      currPage.setData({
        index: currIndex,
                //多选值清零
        multiIndex: [{
          checked: false
        }, {
          checked: false
        }, {
          checked: false
        }, {
          checked: false
        }],
      })

    }
   else{
      //调转到结束页
      wx.redirectTo({
        url: '/pages/tiaozhan/dati/finish/finish',
      })
    }



  },
  onLoad: function(options) {
    var that = this
    wx.request({
      url: 'http://47.101.209.52:9999/wx/problems',
      success: function(res) {
        console.log(res.data)
        that.setData({
          questionList: res.data.problems
        })
        wx.setStorageSync('questionList', res.data.problems)
      }
    })
  },
  onReady:function(){
    // //将本页面的考试题目信息，存储到全局变量中
    // app.globalData.examDatas = this.data.questionList;
    // console.log(this.data.questionList)
    // console.log("全局变量的信息" + app.globalData.examDatas[0].id)

  }
})