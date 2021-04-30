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
  },

  getRecord() {
    wx.showLoading({
      title: '',
    })
   wx.cloud.callFunction({
      name: 'functions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectRecord'
      }
    }).then((resp) => {
      this.setData({
        haveGetRecord: true,
        record: resp.result.data
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

  clearRecord() {
    this.setData({
      haveGetRecord: false,
      record: ''
    })
  }

})
