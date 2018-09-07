//数据验证
let repayValidate = function () {//定义对象构造方法

}

repayValidate.prototype = {  // 封装方法
  mobile: function (value, callback) {//验证手机号
    // var mobile = /^1[3|4|5|7|8]\d{9}$/;
    var mobile = /^1[3|4|5|6|7|8|9]\d{9}$/;
    // return this.optional(element) || (mobile.test(value));
    var vm_ = mobile.test(value);
    if (!vm_) callback && callback();
    return vm_;
  },
  tel: function (value, callback) {//验证座机号码
    var regTel = /^[\d+]{3,4}-[\d+]{7,8}$/;
    var vm_ = regTel.test(value);
    if (!vm_) callback && callback();
    return vm_;
  },
  email: function (value, callback) {
    var email_ = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
    var vm_ = email_.test(value);
    if (!vm_) callback && callback();
    return vm_;
  },
  isLetter: function (val, callback) {//验证纯字母
    var regExp = /^([a-zA-Z]+)$/;
    return regExp.test(val);
  },
  isNum: function (val) {//验证纯数字
    var regExp = /^(\d+)$/;
    return regExp.test(val);
  },
  isSpace: function (val) {//验证是否有空格
    var regExp = /\s/;
    return regExp.test(val);
  },
  isEmpty: function (val, callback) {//是否为空
    var vm_ = (val == "");
    if (vm_) callback && callback();
    return !vm_;
  },
  isImgCode: function (val) {//验证图片验证码
    return (val.length == 4) ? true : false;
  },
  isSMCode: function (val) {//验证短信验证码
    return (val.length == 6) ? true : false;
  },
  vLength: function (val) {//验证是密码长度
    return (val.length < 6 || val.length > 18) ? false : true;
  },
  vPwd: function (val, callback) {//统一验证密码格式 非空 不包含空格 不能纯数字||纯字母 的6~18位字符串
    var regExp1 = /^([a-zA-Z]+)$/,
      regExp2 = /^(\d+)$/,
      regExp3 = /\s/;
    var vm_ = (!regExp1.test(val)) && (!regExp2.test(val)) && (!regExp3.test(val)) && (!(val.length < 6 || val.length > 18)) && (!val == "");
    if (!vm_) callback && callback();
    return vm_;
  },
  vEqualTo: function (valO, valT, callback) {
    var vm_ = (valO === valT) && valO != "" && valT != "";
    if (!vm_) callback && callback();
    return vm_;
  },
  vAccNumExt: function (val, callback) {//不能以'.-_'开头或结尾
    var regExp1 = /^(\.+)$/,
      regExp2 = /^(\-+)$/,
      regExp3 = /^(\_+)$/,
      regExp4 = /^\_|^\-|^\./;
    regExp5 = /\_$|\-$|\.$/;
    var vm_ = (!regExp1.test(val)) && (!regExp2.test(val)) && (!regExp3.test(val)) && (!regExp4.test(val)) && (!regExp5.test(val));
    if (!vm_) callback && callback();
    return vm_;
  },
  vAccNum: function (val, callback) {
    var regExp1 = /^[a-zA-Z0-9\.\_\-]{5,25}$/,
      regExp2 = /^(\d+)$/,
      regExp3 = /^(\.+)$/,
      regExp4 = /^(\-+)$/,
      regExp5 = /^(\_+)$/,
      regExp6 = /^\_|^\-|^\./;
    regExp7 = /\_$|\-$|\.$/;
    var vm_ = (regExp1.test(val)) && (!regExp3.test(val)) && (!regExp4.test(val)) && (!regExp5.test(val)) && (!regExp6.test(val)) && (!regExp7.test(val));
    if (!vm_) callback && callback();
    return vm_;
  },
  vSecName: function (val, callback) {//姓名验证 提示：姓名只能为汉字、英文和分隔号“·”且不能以“·”开头或结尾
    var regExp1 = /^([A-Za-z\·]|[\u4E00-\u9FA5])+$/;//汉字或英文加‘.’
    var regExp2 = /^\·|\·$/;//不能以‘·’开头或结尾
    var vm_ = regExp1.test(val) && !regExp2.test(val);
    if (!vm_) callback && callback();
    return vm_;
  },
  vInt: function (obj) {//限制为大于0 小于限额的整数
    var iLimt = $(obj).data("limt");//限额
    var iVal = $(obj).val();
    if (!/^([0-9]+)$/.test(iVal)) {
      iVal = iVal.replace(/[^0-9]/g, '');
      if (/^0+/.test(iVal)) {
        iVal = iVal.replace(/0+/, '');
      }
      $(obj).val(iVal);
    }
    if (/^0+/.test(iVal)) {
      iVal = iVal.replace(/0+/, '');
      $(obj).val(iVal);
    }
    if (parseInt(iVal) > parseInt(iLimt)) $(obj).val(iLimt);
  },
  vCardNo: _idcardno
}

/**
 * 验证二代身份证
 */
function _idcardno(g, callback) {
  var f = 0;
  var a = g;
  var e = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙",
    21: "辽宁",
    22: "吉林",
    23: "黑龙",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  // if (!/^\d{17}(\d|x)$/i.test(a)) {//不区分大小写x
  if (!/^\d{17}(\d|X)$/.test(a)) { // 只能为大写x
    callback && callback(); // alert(tip);
    return false;
  }
  // a = a.replace(/x$/i, "a");
  a = a.replace(/X$/, "a");
  if (e[parseInt(a.substr(0, 2))] == null) {
    callback && callback(); // alert(tip);
    return false;
  }
  var c = a.substr(6, 4) + "-" + Number(a.substr(10, 2)) + "-" + Number(a.substr(12, 2));
  var h = new Date(c.replace(/-/g, "/"));
  if (c != (h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + h.getDate())) {
    callback && callback(); // alert(tip);
    return false;
  }
  for (var b = 17; b >= 0; b--) {
    f += (Math.pow(2, b) % 11) * parseInt(a.charAt(17 - b), 11)
  }
  if (f % 11 !== 1) {
    callback && callback(); // alert(tip);
    return false;
  }
  return true;
}

module.exports = {
  repayValidate: repayValidate
}