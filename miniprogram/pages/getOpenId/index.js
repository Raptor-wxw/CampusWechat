Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetOpenId: false,
    envId: '',
    openId: ''
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    })
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
    }).catch((e) => {
      this.setData({
        showUploadTip: true
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  clearOpenId() {
    this.setData({
      haveGetOpenId: false,
      openId: ''
    })
  }

})
