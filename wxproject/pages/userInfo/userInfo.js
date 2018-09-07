// pages/userInfo/userInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrPayType: ['在线支付', '银联支付', '苹果pay支付', '货到付款'],
    objectArrPayType: [
      { code: 0, text: '在线支付' },
      { code: 1, text: '银联支付' },
      { code: 2, text: '苹果pay支付' },
      { code: 3, text: '货到付款' },
    ],
    date: '2016-09-01',
    index: 0,
    region: ['河北省', '保定市', '唐县'],
    customItem: '全部'
  },

  dateChange:function(e){
    console.log(`picker选择值改变为${e.detail.value}`);
    this.setData({
      date: e.detail.value
    })
  },

  selectChange:function(e){
    console.log(`picker选择值改变为${e.detail.value}`);
    this.setData({
      index: e.detail.value
    })
  },

  bindRegionChange: function(e){
    debugger;
    console.log(`picker发送选择改变，携带值为${e.detail.value}`);
    this.setData({
      region: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})