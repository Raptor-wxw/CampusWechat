Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetRecord: false,
    envId: '',
    record: ''
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    })
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'functions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'sumRecord'
      }
    }).then((resp) => {
      this.setData({
        record: resp.result.list
      })
    }).catch((e) => {
      console.log(e)
      this.setData({
        showUploadTip: true
      })
    }).finally(() => {
      wx.hideLoading()
    })
  },

  goBack() {
   wx.navigateBack()
  },

})
