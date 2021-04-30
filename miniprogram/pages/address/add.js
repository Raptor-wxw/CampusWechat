// pages/address/add.js
import WxValidate from '../../utils/WxValidate'
import {
  addUserAddr, getUserAddr
} from '../../utils/apis'
import {
  alert,
  getCurrentAddress, reverseGeocoder,
  getPrevPage
} from '../../utils/util'
Page({
  data: {
    hasData: false,
    changeDatabase: false,
    receiver: null,       //收货人
    phone: null,          //电话
    palce: null,          //地址
    dormitory: null,      //宿舍号
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    // this.id = options.id
    // this.callback = options.callback || 'callback'
    // this.initValidate()
    // if (this.id) {
    //   this.loadData()
    // } else {
    //   this.initAddress()
    // }
    this.initValidate()
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
	  console.log(this.data.receiver)
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  send(){
    alert("test");
  },
  formSubmit: function(e) {
    var that = this
    this.setData({
      receiver: e.detail.value.receiver,
      phone: e.detail.value.phone,
      place: e.detail.value.place,
      dormitory: e.detail.value.dormitory
    })


    if (!this.data.receiver || !this.data.phone || !this.data.place || !this.data.dormitory) {
      return alert('请填写完整')
    }

    // if (!this.validate.checkForm(e)) {
    //   const error = this.validate.errorList[0]
    //   return alert(error.msg)
    // }

    //将收货信息填入云端数据库
    //若成功填入则将“已填入数据库”改为true
    // this.setData({
    //   changeDatabase: true
    // })

    wx.showToast({
      title: '修改成功',
      icon: 'success',
      duration: 2000//持续的时间
 
    })

    //将数传回给addressList
    setTimeout(function(){
      wx.navigateTo({
        url: './list',
        success: function(res) {
          res.eventChannel.emit('acceptDataFromOpenerPage', {
            receiver: this.data.receiver, 
            phone: this.data.phone, 
            place: this.data.place, 
            dormitory: this.data.dormitory})
        }
      })
    }, 1000)
  }
})