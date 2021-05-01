// pages/mine/mine.js
import { getUserInfo, makePhoneCall } from '../../utils/util'
import { logout } from '../../utils/apis'

const app = getApp()
Page({
  data:{
    userInfo: {},
    loginInfo: false
  },

  onLoad:function(options){
    if(!this.data.hasUserInfo){
      this.setData({
        userInfo: app.globalData.userInfo,
        loginInfo: app.globalData.hasUserInfo
      })
    }
  },

  getOpenId() {
    wx.showLoading({
      title: '',
    })
   wx.cloud.callFunction({
      name: 'functions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId'
      }
    }).then((resp) => {
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid
      })
      getApp().globalData.haveGetOpenId = true
      getApp().globalData.openId = this.data.openId
    }).catch((e) => {
      this.setData({
        showUploadTip: true
      })
    }).finally(() => {
      wx.hideLoading()
      console.log(app.globalData.openId)
    })
  },

  getUserProfile(e) {
    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        getApp().globalData.userInfo = res.userInfo
        getApp().globalData.hasUserInfo = true
        this.setData({
          userInfo: res.userInfo,
          loginInfo: true
        })
        this.getOpenId()
        console.log(res.userInfo)
      }
    })
  },

  onExit(e){
    this.setData({
      loginInfo: false,
      userInfo: null
    })
    getApp().globalData.userInfo = null
    getApp().globalData.hasUserInfo = false
  },

  onReady:function(){
    // 页面渲染完成
  },

  onShow:function(){
    this.setData({
      userInfo: app.globalData.userInfo,
      loginInfo: app.globalData.hasUserInfo
    })
  },

  onHide:function(){
    // 页面隐藏
  },

  onUnload:function(){
    // 页面关闭
  },

  onPhoneTap(e) {
    makePhoneCall(e.currentTarget.dataset.phone)
  },

  // onLogout(e) {
  //   var that = this
  //   var {loginInfo: {phone}, loading} = this.data
  //   if(loading) {
  //     return
  //   }
  //   this.setData({
  //     loading: true
  //   })
  //   logout({
  //     phone,
  //     success(data) {
  //       app.setLoginInfo(data)
  //       that.setData({
  //         loginInfo: null,
  //         loading: false
  //       })
  //     }
  //   })
  // },
  // callback(loginInfo) {
  //   this.setData({
  //     loginInfo: loginInfo.user_info
  //   })
  // },

  onShareAppMessage() {
    return {
      title: '我的信息',
      path: '/pages/mine/mine'
    }
  }
})