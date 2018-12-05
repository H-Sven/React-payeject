export default {
  // 格林尼治时间字符串转时间字符串
  formatDateGL(myTimes){
    let d = new Date(myTimes);
    let format =  d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds(); 
    return this.timeStamp(format)
  },
  comdify(num) { //千分位格式化
    return num.toString().replace(/\d+/, function (n) { // 先提取整数部分
      return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) { // 对整数部分添加分隔符
          return $1 + ",";
      });
    });
  },
  filterTrim(str){
    return str.replace(/[^a-z0-9]+/ig,"");
  },
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
  },
  filterLangName(lang){
    switch(lang){
      case 'zh': return '简体中文';
      case 'en': return 'English';
      case 'ko': return '한국어';
      default: return 'zh';
    }
  },
  Copy(copyInfo){
    return new Promise((resolve, reject) => {
      let copyUrl = document.createElement("input");//创建一个input框获取需要复制的文本内容
      copyUrl.value = copyInfo;
      let appDiv = document.getElementById('app');
      appDiv.appendChild(copyUrl); 
      copyUrl.select();
      document.execCommand("Copy");
      copyUrl.remove()
      resolve(true);
    })
  },
  generateUUID() {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === "function") {
        d += performance.now(); //use high-precision timer if available
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },
  isPhone: function (num) {
    var reg = /^1[3456789]\d{9}$/;
    return reg.test(num);
  },
  isEmail: function (num) {
    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(num);
  },
  isPhoneEmail: function (num) {
    var reg = /(^1[3456789]\d{9}$)|(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/
    return reg.test(num);
  },
  isPassword: function (num) {
    // 8到20位（字母，数字，特殊符号任意两种组合）
    var reg = /^(?![a-zA-z]+$)(?!\d+$)(?![!"#$%&'()*+,-./:;<=>?^_`\{|}~@]+$)[a-zA-Z\d!"#$%&'()*+,-./:;<=>?^_`\{|}~@]{8,20}$/;
    // var reg = /^(?![a-zA-z]+$)(?!\d+$)(?![_#@.]+$)[a-zA-Z\d_#@.]{8,20}$/;
    return reg.test(num);
  },
  isNumberId: function (num) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(num);
  },
  isNumber: function (num) {
    var reg = /^\d+$/;
    return reg.test(num);
  },
  isNumberFloat: function (num) {
    var reg = /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g;
    return reg.test(num);
  },
  // 倒计时
  countdown(time) {
    var timeDate = (time / 1000) * 100; //秒 x 100
    var myDate = 0;
    var timer = setInterval(function () {
      timeDate--;
      if (timeDate <= 0) {
        clearInterval(timer);
      } else {
        var ss = Math.floor(timeDate / 100); //总秒数
        var h = Math.floor(ss / 3600); //时
        var m = Math.floor((ss / 60 % 60)); // 分
        var s = Math.floor((ss % 60)); //秒
        var ms = timeDate - Math.floor(timeDate / 100) * 100; //毫秒
        myDate = h + ':' + m + ":" + s + ':' + ms;
      }
    }, 10);
  },
  // 毫秒转格式
  overTime(time) {
    var a = (time % 1000).toString().substr(0, 2);
    var b = Math.floor(time / 1000);
    var m = b % 60;
    m = String(m);
    m = m.length >= 2 ? m : "0" + m;
    var f = Math.floor(time / (1000 * 60));
    f = String(f);
    f = f.length >= 2 ? f : "0" + f;
    return f + ":" + m + "." + a;
  },
  //将0-9的数字前面加上0，例1变为01
  checkTime(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  },
  // 倒计时(传入截止时间的方式)
  leftTimer(enddate) {
    let leftTime = (new Date(enddate)) - new Date(); //计算剩余的毫秒数
    let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    let hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    let minutes = parseInt(leftTime / 1000 / 60 % 60, 10); //计算剩余的分钟
    let seconds = parseInt(leftTime / 1000 % 60, 10); //计算剩余的秒数
    days = this.checkTime(days);
    hours = this.checkTime(hours);
    minutes = this.checkTime(minutes);
    seconds = this.checkTime(seconds);
    if (days <= '00' && hours <= '00' && minutes <= '00' && seconds <= '00') {
      return null;
    }
    if (days >= '00' || hours >= '00' || minutes >= '00' || seconds >= '00') {
      return minutes + ":" + seconds
    }
  },
  //将时间戳转换成日期格式
  formatDate: function (x, y) {
    if (!(x instanceof Date)) {
      var date = new Date();
      date.setTime(x * 1000);
      x = date;
    }
    var z = {
      y: x.getFullYear(),
      M: x.getMonth() + 1,
      d: x.getDate(),
      h: x.getHours(),
      m: x.getMinutes(),
      s: x.getSeconds()
    };
    return y.replace(/(y+|M+|d+|h+|m+|s+)/g, function (v) {
      return ((v.length > 1 ? "0" : "") + eval("z." + v.slice(-1))).slice(
        -(v.length > 2 ? v.length : 2)
      );
    });
  },
  formatDateTime: function (timeStamp) {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  //将日期格式转换成时间戳
  timeStamp: function (myDate) {
    var date = new Date(myDate);
    return date.getTime() / 1000;
  },
  //获取当前系统时间
  getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  // 获取n天前的日期
  getNday(n) {
    let date = new Date();
    let newDate = new Date(date.getTime() - n * 24 * 60 * 60 * 1000);
    let time = newDate.getFullYear() + "-" + (newDate.getMonth() + 1) + "-" + newDate.getDate();
    return time;
  },
  inWeixin: function () {
    var ua = navigator.userAgent.toLowerCase();
    return ua.indexOf("micromessenger") !== -1;
  },
  isAndroid() {
    var u = navigator.userAgent;
    return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  },
  isiOS() {  
    var u = navigator.userAgent;
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  },
  getCookie: function (name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return decodeURI(arr[2]);
    else return null;
  },
  setCookie: function (name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie =
      name +
      "=" +
      escape(value) +
      (expiredays === null ? "" : ";expires=" + exdate.toGMTString()) +
      ";domain=" + document.domain + ";path=/";
  },
  //删除指定cookie
  clearCookie: function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval !== null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString() + ";domain=" + document.domain + ";path=/";
  },
  //删除所有cookie
  deleteCookie: function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + "=0;expires=" + new Date(0).toUTCString() + ";domain=" + document.domain + ";path=/";
    }
  },
  // 获取url参数
  GetQueryString: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  },
  /**
   * 拼接对象为请求字符串
   * @param {Object} obj - 待拼接的对象
   * @returns {string} - 拼接成的请求字符串
   *
   * 代码中使用的方式 es6语法:
   * @param {string} baseUrl - url地址
   * var finalUrl = `${baseUrl}?${encodeParams(obj)}`;
   */
  encodeParams: function (obj) {
    var params = [];
    Object.keys(obj).forEach(function (key) {
      var value = obj[key];
      // 如果值为undefined我们将其置空
      if (typeof value === "undefined") {
        value = "";
      }
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      // 对于需要编码的文本（比如说中文）我们要进行编码
      params.push([key, encodeURIComponent(value)].join("="));
    });
    return params.join("&");
  },
  encodeParamsStr: function (obj) {
    var params = [];
    Object.keys(obj).forEach(function (key) {
      var value = obj[key];
      // 如果值为undefined我们将其置空
      if (typeof value === "undefined") {
        value = "";
      }
      // 对于需要编码的文本（比如说中文）我们要进行编码
      // params.push([key, encodeURIComponent(value)].join("="));
      params.push([key, value].join("="));
    });
    return params.join("&");
  },
  //获取url中"?"符后的字符串并转化为对象
  GetRequest: function () {
    var url = window.location.search;
    var theRequest = new Object();
    if (url.indexOf("?") !== -1) {
      var strs = url.substr(1);
      strs = strs.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
    }
    return theRequest;
  },
  // 是否是NaN
  myIsNaN(value) {
    return typeof value === 'number' && isNaN(value);
  },
  isDecimal(number){
    const x = String(number).indexOf('.') + 1;   //小数点的位置
    const y = String(number).length - x;  //小数的位数
    return y > 1 ? y : 2
  },
  // 科学计数法  eg： 1.2000002203998405e-10
  science: function (num) {
    if ((num + '').indexOf('E-') > -1 || (num + '').indexOf('e-') > -1) {
      var a = (num + '').indexOf('E-') > -1 ? (num + '').split('E-') : (num + '').split('e-'),
        b = a[0],
        c = parseInt(a[1]),
        d = [],
        i;
      for (i = 0; i < c - 1; i++) {
        d[i] = 0;
      }
      num = '0.' + d.join('') + (b * 100);
    }
    return num
  },
  // 保留n位小数
  toDecimal: function (cnum, cindex) {
    let value = String(cnum);
    if (value.indexOf(".") > 0) {
      var left = value.substr(0, value.indexOf("."));
      var right = value.substr(value.indexOf(".") + 1, value.length);
      if (right.length > cindex) {
        right = right.substr(0, cindex);
      }
      value = left + "." + right;
      return value;
    } else {
      return cnum;
    }
  },
  // 数数相加，避免浮点数
  addNum(num1, num2) {
    let sq1, sq2, m;
    try {
      sq1 = num1.toString().split('.')[1].length;
    }
    catch (e) {
      sq1 = 0;
    }
    try {
      sq2 = num2.toString().split('.')[1].length;
    }
    catch (e) {
      sq2 = 0;
    }
    m = Math.pow(10, Math.max(sq1, sq2));
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
  },
  //获取小数点位数
  decimalLength(num) {
    return String(num).length - (String(num).indexOf('.') + 1);
  },
  // 去除数组中的空元素
  filter_array(array) {
    return array.filter(item => item);
  },
  // 数组对象排序 大到小  eg:arr.sort(maxSort("age"))
  maxSort: function (prop) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (val1 > val2) {
        return -1;
      } else if (val1 < val2) {
        return 1;
      } else {
        return 0;
      }
    }
  },
  // 数组对象排序 小到大 eg:arr.sort(minSort("age"))
  minSort: function (prop) {
    return function (obj1, obj2) {
      var val1 = obj1[prop];
      var val2 = obj2[prop];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    }
  },

};
