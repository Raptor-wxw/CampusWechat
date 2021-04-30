//index.js
//获取应用实例
import {
  getSellers
} from '../../utils/apis'
var app = getApp();

Page({
  data: {
    category: [
      {
        "category_id": "1",
        "title": "校园帮帮",
        "icon": "/images/category/1.png"
      },
      {
        "category_id": "2",
        "title": "食堂外卖",
        "icon": "/images/category/2.png"
      },
      {
        "category_id": "3",
        "title": "甜品蛋糕",
        "icon": "/images/category/3.png"
      },
      {
        "category_id": "4",
        "title": "水果配送",
        "icon": "/images/category/4.png"
      },
      {
        "category_id": "5",
        "title": "超市代购",
        "icon": "/images/category/5.png"
      },
      {
        "category_id": "6",
        "title": "快递代取",
        "icon": "/images/category/6.png"
      },
      {
        "category_id": "7",
        "title": "跑腿广场",
        "icon": "/images/category/8.png"
      },
      {
        "category_id": "8",
        "title": "我要发布",
        "icon": "/images/category/7.png"
      }
    ],
    page: 0,
    hasMore: true,
    hasUserInfo: false,
    userInfo: {},
    school: '烟台大学',
    shopList : [{is_rest: 0, 
      pic_url:"../../images/logo.png", 
      seller_name: "晓文食堂", 
      over_all: 0.0, 
      sales:98, 
      min_price: 10, 
      reach_time:40},
    {is_rest: 0, 
      pic_url:"../../images/logo.png", 
      seller_name: "小许食堂", 
      over_all: 0.0, 
      sales:98, 
      min_price: 10, 
      reach_time:40}],
    loading: false,
  },
  onLoad: function () {
    // this.initAddress()
    // this.loadData()
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        getApp().globalData.userInfo = res.userInfo
        getApp().globalData.hasUserInfo = true
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  onShow:function(){
    this.setData({
      userInfo: app.globalData.userInfo,
      hasUserInfo: app.globalData.hasUserInfo
    })
  },

  loadData() {
    if (this.data.loading) {
      return;
    }
    var that = this
    var {
      page,
    } = this.data

    this.setData({
      loading: true
    })
    getSellers({
      page,
      success(data) {
        var {
          shopList
        } = that.data

        var list = data.list.map(item => {
          item['distanceFormat'] = (item.distance / 1000).toFixed(2)
          return item
        })
        that.setData({
          shopList: shopList ? shopList.concat(list) : list,
          page: page + 1,
          hasMore: data.count == 10,
          loading: false
        })
      }
    })
  },

  invalidateData() {
    this.setData({
      page: 0,
      hasMore: true,
      loading: false,
      shopList: null
    })
  },

  onReachBottom(e) {
    if (this.data.hasMore && !this.data.loading) {
      this.loadData()
    }
  },

  onShareAppMessage() {
    return {
      title: '首页',
      path: '/pages/index/index'
    }
  }
})
