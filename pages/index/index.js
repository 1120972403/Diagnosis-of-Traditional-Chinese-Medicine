Page({
  data: {
    cardCur: 0,
    tmp: '',
    getlist: [],
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'http://img4.imgtn.bdimg.com/it/u=3450770463,515752687&fm=26&gp=0.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'http://img0.imgtn.bdimg.com/it/u=3687040554,1092796648&fm=26&gp=0.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'http://img0.imgtn.bdimg.com/it/u=321278345,3001105435&fm=26&gp=0.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'http://img5.imgtn.bdimg.com/it/u=755201383,1704629206&fm=26&gp=0.jpg'
    }],
  },
  // 搜索
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
      url: 'http://47.101.209.52:9999/wx/getMovement',
      data: {
        keyword: this.data.tmp,
      },
      success: function(res) {
        console.log(res.data),
          that.setData({
            getlist: res.data.movements
          })
      }
    })
  },
  //评论
  pinglun: function(e) {
    console.log(e.target.dataset.id)
var id = e.target.dataset.id
    wx.navigateTo({
      url: './pinglun/pinglun?id=id',
    })
  },
  fabu: function() {
    wx.navigateTo({
      url: './fabu/fabu',
    })
  },
  onLoad() {
    this.towerSwiper('swiperList');
    // 初始化towerSwiper 传已有的数组名即可
    var that = this
    // var uid = wx.getStorageSync('uid')
    wx.request({
      url: 'http://47.101.209.52:9999/wx/getMovement',
      data: {
        keyword: ''
      },
      success: function(res) {
        console.log(res.data.movements)
        that.setData({
          getlist: res.data.movements
        })
      }
    })
  },
  DotStyle(e) {
    this.setData({
      DotStyle: e.detail.value
    })
  },
  // cardSwiper
  cardSwiper(e) {
    this.setData({
      cardCur: e.detail.current
    })
  },
  // towerSwiper
  // 初始化towerSwiper
  towerSwiper(name) {
    let list = this.data[name];
    for (let i = 0; i < list.length; i++) {
      list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
      list[i].mLeft = i - parseInt(list.length / 2)
    }
    this.setData({
      swiperList: list
    })
  },
  // towerSwiper触摸开始
  towerStart(e) {
    this.setData({
      towerStart: e.touches[0].pageX
    })
  },
  // towerSwiper计算方向
  towerMove(e) {
    this.setData({
      direction: e.touches[0].pageX - this.data.towerStart > 0 ? 'right' : 'left'
    })
  },
  // towerSwiper计算滚动
  towerEnd(e) {
    let direction = this.data.direction;
    let list = this.data.swiperList;
    if (direction == 'right') {
      let mLeft = list[0].mLeft;
      let zIndex = list[0].zIndex;
      for (let i = 1; i < list.length; i++) {
        list[i - 1].mLeft = list[i].mLeft
        list[i - 1].zIndex = list[i].zIndex
      }
      list[list.length - 1].mLeft = mLeft;
      list[list.length - 1].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    } else {
      let mLeft = list[list.length - 1].mLeft;
      let zIndex = list[list.length - 1].zIndex;
      for (let i = list.length - 1; i > 0; i--) {
        list[i].mLeft = list[i - 1].mLeft
        list[i].zIndex = list[i - 1].zIndex
      }
      list[0].mLeft = mLeft;
      list[0].zIndex = zIndex;
      this.setData({
        swiperList: list
      })
    }
  }
})