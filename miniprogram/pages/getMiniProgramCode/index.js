Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetCodeSrc: false,
    envId: '',
    codeSrc: ''
  },

  onLoad(options) {
    this.setData({
      envId: options.envId
    })
  },

  getCodeSrc() {
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'functions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getMiniProgramCode'
      }
    }).then((resp) => {
      this.setData({
        haveGetCodeSrc: true,
        codeSrc: resp.result
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

  clearCodeSrc() {
    this.setData({
      haveGetCodeSrc: false,
      codeSrc: ''
    })
  }

})
