var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
  data: {
    tabs: ["../../icon/taiji01.png", "../../icon/yaoshan.png"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    tmp: '',
    entry: '',
    mapUrl: "",
    isShow: true,
    conys_listtent: []
  },
  valuechange: function(res) {
    this.setData({
      tmp: res.detail.value
    })

  },
  search: function() {
    if (this.data.tmp == '') {
      wx.showToast({
        title: '输入不能为空',
        icon: 'none'
      })
      return
    }
    var that = this;
    wx.request({
      url: 'http://47.101.209.52:9999/wx/cook',
      data: {
        keyword: this.data.tmp,
      },
      success: function(res) {
        console.log(res.data),
          that.setData({
            ys_list: res.data.cooks
          })
      }
    })
  },
  changeToggle() {
    var that = this;
    that.setData({
      isShow: !that.data.isShow
    })
  },
  onLoad: function() {
    var that = this;

    //获取系统信息，手机的屏幕高度
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          winHeight: res.windowHeight,
          winWidth: res.windowWidth
        })
      },
    })
    wx.request({
        url: 'http://47.101.209.52:9999/wx/cook',
        data: {
          keyword: "",
        },
        success: function(res) {
          console.log(res.data),
            that.setData({
              ys_list: res.data.cooks
            })
        }
      }),
      //太极信息加载
      that.setData({
        mapUrl: "http://ips.ifeng.com/video19.ifeng.com/video09/2019/05/05/p18630062-102-009-144457.mp4?vid=3c2c2e7a-1795-43bf-b66e-91bf4d9d2dac&uid=Xi90e1&from=v_Free&pver=vHTML5Player_v2.0.0&sver=&se=%E4%BD%93%E8%82%B2%E5%9B%BE%E6%96%87%E6%B1%87&cat=81-83&ptype=81&platform=pc&sourceType=h5&dt=1557038665000&gid=rc90AWr6JlvB&sign=572350dd9508596e758d133bdf017235&tm=1558974979014"
      })
    wx.request({
        url: 'https://zlzyy.club/API/tjtupian.aspx',
        success: function(res) {
          console.log(res.data),
            that.setData({
              content: res.data
            })
        }
      }),
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
            sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
          });
        }
      });
  },
  tabClick: function(e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  }
});