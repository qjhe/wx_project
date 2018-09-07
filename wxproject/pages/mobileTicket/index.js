// pages/mobileTicket/index.js
const mv = require('../../utils/validate.js');
const rValidate = new mv.repayValidate();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeFlag: false,
    queryFlag: false,
    obj: {
      mobile: '15910888897',
      phonePwd: '123456',
      opCode: '123456',
      captcha: '',
      queryPwd: '',
      dataList: {},
    }
  },

  callTel: function (event) {
    var phoneNum = event.currentTarget.dataset.num
    wx.makePhoneCall({
      phoneNumber: phoneNum
    })
  },

  toast: function (text) {
    wx.showToast({
      title: text,
      icon: 'none',
      duration: 3000
    });
  },

  validateForm: function () {
    if (
      !rValidate.mobile(this.data.obj.mobile, () => {
        this.toast('手机号码格式错误');
      })
    ) {
      return false;
    }
    return true;
  },

  submit: function (type) {
    let _this = this;
    if (!_this.validateForm()) return
    wx.showLoading({ 
      title: '加载中...', 
      mask: true,
    });
    let query = {
      account: _this.data.obj.mobile, // 运营商登录手机号
      
      type: '1' // 默认操作类型为 1
    };
    if (_this.data.obj.codeFlag) {
      query.type = '1'; // 1-提交短信验证码
      query.captcha = _this.data.obj.captcha; // 短信验证码
    }
    if (_this.data.obj.queryFlag) {
      query.type = '3'; // 3-提交查询密码
      query.queryPwd = _this.data.obj.phoneQueryPwd; // 网站查询密码
    }
    if (type) query.type = type;
    wx.request({
      method: 'POST',
      url: 'MobileList/v1/', 
      data: query,
      header: {
        'content-type': 'application/json',
        'pid': '868217038744018',
        'token': '868217038744018'
      },
      success: function (response) {
        wx.hideLoading();
        response = response.data;
        debugger;
        if (response.retCode == '200') {

          if (response.responseBody.status == '0001') {
            _this.toast('认证成功！');
          }
        } else if (
          response.retCode == '10002' ||
          response.errorDesc == '输入短信验证码' ||
          response.errorDesc == '短信验证码不能为空'
        ) { // 还需要再输入短信验证码
          //_this.countDown();
          _this.toast('倒计时');
          _this.data.codeFlag = true;
          _this.setData(_this.data);
        } else if (response.retCode == '10022') { // 还需要再输入查询密码
          _this.obj.queryFlag = true;
          _this.setData(_this.data);
        } else if (response.retCode == '30000' || response.retCode == '0') {
          _this.toast('认证超时，请重新尝试');
        } else {
          _this.toast(response.errorDesc);
        }
      },
      fail: function (err) {
        wx.hideLoading();
        _this.toast('认证超时，请重新尝试');
      }
    })
  },

  changeIptVal: function (e) {
    let dataset = e.currentTarget.dataset
    this.data.obj[dataset.item] = e.detail.value;
    this.setData(this.data);
  },

  getMobileList: function () {
    // 获取手机详单回执
    let _this = this;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      method: 'POST',
      url: 'eList/v1/',
      data: {
        
      },
      header: {
        'content-type': 'application/json',
        'pid': '868217038744018',
        'token': '868217038744018'
      },
      success: function (response) {
        response = response.data;
        wx.hideLoading();
        if (response.retCode == '200') {
          let dataList = response.responseBody;
          _this.data.dataList = dataList;
          _this.setData(_this.data);
        } else {
          _this.toast(response.errorDesc);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMobileList();
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