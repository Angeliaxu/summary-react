import { JSEncrypt } from 'jsencrypt';
import aesjs from 'aes-js';

/**
 * 对小于10的数字前面补0
 * @param {String} num
 */
export const fixZero = (num) => {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
};

export const formatDate = (date, formatStr) => {
  const d = new Date(date);
  const years = d.getFullYear();
  const month = fixZero(d.getMonth() + 1);
  const day = fixZero(d.getDate());
  const hours = fixZero(d.getUTCHours() + 8); // 不用getHours是因为测试的模拟器时间错误 TAT
  const minutes = fixZero(d.getMinutes());
  const seconds = fixZero(d.getSeconds());

  // stupid code
  switch (formatStr) {
    case 'MM.dd':
      return `${month}.${day}`;
    case 'yyyy-MM-dd':
      return `${years}-${month}-${day}`;
    case 'HH:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    case 'yyyy-MM-dd HH:mm':
      return `${years}-${month}-${day} ${hours}:${minutes}`;
    default:
      return `${years}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

/**
 * 针对PPmoney返回的日期进行格式化
 * @param {number|string} date 20170202 20170102092236
 * @param {string} formatStr yyyy-MM-dd
 */
export const formatDate2 = (date, formatStr) => {
  const d = `${date}`;
  const years = d.substr(0, 4);
  const month = d.substr(4, 2);
  const day = d.substr(6, 2);
  const hours = d.substr(8, 2) || '00';
  const minutes = d.substr(10, 2) || '00';
  const seconds = d.substr(12, 2) || '00';

  // stupid code
  switch (formatStr) {
    case 'MM.dd':
      return `${month}.${day}`;
    case 'yyyy-MM-dd':
      return `${years}-${month}-${day}`;
    case 'yyyy/MM/dd':
      return `${years}/${month}/${day}`;
    case 'HH:mm:ss':
      return `${hours}:${minutes}:${seconds}`;
    case 'yyyy-MM-dd HH:mm':
      return `${years}-${month}-${day} ${hours}:${minutes}`;
    default:
      return `${years}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};

export const formatHashTabId = (hash) => {
  if (!hash) return '';
  const tab = hash.substr(1); // 去掉开头的#号
  return tab;
};

export const randomString = (len = 32) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$';
  for (let i = 0; i < len; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return `${text}`;
};

// 去处文本中的html标记
export const delHtmlTag = (html = '') => html.replace(/<[^>]+>/g, '');

/**
 * 信息收集
 * @param {string} eventID 事件id
 * @param {array} args 参数
 * @example webInfoCollect('eventId', 'key', 'value')
 * @example webInfoCollect('repay_next_click', 'type', 'normal', 'result', 'success')
 */
export const webInfoCollect = (eventID, name, ...args) => {
  let json = null;
  if (args.length > 1) {
    json = {};
    for (let i = 0; i <= args.length - 2; i += 2) {
      json[args[i]] = args[i + 1];
    }
  } else if (args.length === 1) {
    // eslint-disable-next-line
    console.warn(...args, 'will not send');
  }
  if (window.jsBridge && typeof window.jsBridge.webInfoCollectKeyValue === 'function' &&
    typeof window.jsBridge.webInfoCollectJson === 'function') {
    if (json) {
      window.jsBridge.webInfoCollectJson(eventID, name, JSON.stringify(json));
      return;
    }
    window.jsBridge.webInfoCollect(eventID, name);
  } else {
    if (json) {
      // eslint-disable-next-line
      console.log('数据收集v2', eventID, name, JSON.stringify(json));
      return;
    }
    // eslint-disable-next-line
    console.log('数据收集v2', eventID, name, ...args);
  }
};

const RSA_PUB = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAqYbchVkm/CVsls+lfw9d
7/AP1lcpA2oDZsDD0hkzbUCrn2H2XE9FyIWgiR0wTYRpjJuU4CXqO0EnqjZC8jQ2
C0xUgCormt+8vg1M/Lz1gFp4hIxbLnBT52kIg5u/5sPiLhZA+F0FkpZ1xbBhpZ5+
pVxp7OlQN4OYJD0mMLkWZ84H/3MqP0AayyEuAyZ+XdXPoXo4OxP7g70p/po0VfAa
RnT6rBoWig50V0C3UwhnzdPMBFD1Ao/L5JTNeFjGRQ5bqFUKGaUdZFt0c/7c0HyL
xilTP0NNAQRH07BWMCBdgW2pKX8XcUJlfO73G/uR1/qQfO06eI+vOno6cPFkTxu8
zQIDAQAB
-----END PUBLIC KEY-----
`;

const RSA_MAX_LENGTH = 244;

export const encryptReqParam = (queryString, publicKey = RSA_PUB) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);

  let encrypted = '';
  const length = queryString.length;
  if (length <= RSA_MAX_LENGTH) {
    encrypted = encrypt.encrypt(queryString);
  } else { // 长度超过255-11时，拆分加密
    let splitted = 0; // 已切分长度
    while (splitted < length) {
      const str = queryString.substr(splitted, RSA_MAX_LENGTH);
      const enStr = encrypt.encrypt(str); // jsEncrypt加密后自动base64
      encrypted += window.atob(enStr);  // 先decode base64，所有加密后一起base64，与后端一致
      splitted += RSA_MAX_LENGTH;
    }
    encrypted = window.btoa(encrypted); // 转base64
  }
  // 替换+/，为了对应go的base64.URLEncoding.EncodeToString([]byte(buffer))
  return encrypted.replace(/[+]/g, '-').replace(/[/]/g, '_');
};

function base64ToArrayBuffer(base64) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i += 1) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}


export const decryptResData = (dataString, randomKey) => {
  const key = aesjs.utils.utf8.toBytes(randomKey);
  // eslint-disable-next-line
  const aesEcb = new aesjs.ModeOfOperation.ecb(key);
  const b64data = dataString.replace(/[-]/g, '+').replace(/[_]/g, '/');
  const encryptedBytes = base64ToArrayBuffer(b64data);
  const decryptedBytes = aesEcb.decrypt(encryptedBytes);
  const dataLength = Array.prototype.lastIndexOf.call(decryptedBytes, 125) + 1;
  const jsonString = aesjs.utils.utf8.fromBytes(
    new Uint8Array(Array.prototype.slice.call(decryptedBytes, 0, dataLength)));
  const result = JSON.parse(jsonString);
  const data = JSON.parse(result.data);
  return data;
};

// eslint-disable-next-line
export const getUrlKey = (name) => {
  // eslint-disable-next-line
  return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href) || [,""])[1].replace(/\+/g,'%20'))||null;
};

/* eslint-disable */

// 向右移位
function shiftRight(number, digit){
  digit = parseInt(digit, 10);
  var value = number.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] + digit) : digit))
}
// 向左移位
function shiftLeft(number, digit){
  digit = parseInt(digit, 10);
  var value = number.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - digit) : -digit))
}

// 数字转大写
export const digitUpperCase = (n) => {
  var fraction = ['角', '分'];
  var digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(shiftRight(n,1+i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
          p = digit[n % 10] + unit[1][j] + p;
          n = Math.floor(shiftLeft(n, 1));
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
      .replace(/(零.)+/g, '零')
      .replace(/^整$/, '零元整');
};

// 获取当前日期
export const nowDate = () => {
  const nowDate = new Date();
  const year = nowDate.getFullYear();
  const month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  const day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  const dateStr = year + "-" + month + "-" + day;
  return dateStr;
};

/**
 * 字段隐藏规则
 */
export const fieldFormatRule = {
  // 身份证号（显示前六位后四位）
  document(idcardnum) {
    return idcardnum.replace(/(\d{6})\d+(\w{4})/, "$1********$2");
  },

  // 姓名（保留最后一个字）
  name(userName) {
    return `${'****'.slice(0, userName.length-1)}${userName.slice(-1)}`;
  },
  acName(userName) {
    return `${'****'.slice(0, userName.length-1)}${userName.slice(-1)}`;
  },
  repayUserName(userName) {
    return `${'****'.slice(0, userName.length-1)}${userName.slice(-1)}`;
  },

  // 银行卡号（显示前四位后四位）
  bankCard(bankAccount) {
    return bankAccount.replace(/(\d{4})\d+(\d{4})/, "$1 **** **** $2");
  },
  repayBankAccount(bankAccount) {
    return bankAccount.replace(/(\d{4})\d+(\d{4})/, "$1 **** **** $2");
  },

  // 手机号（显示前三位后四位）
  phone(phone) {
    return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }
};

  //格式化金额
export const outputdollars = (number) => {
console.log(number.length);
if (number.length <= 3)
  return (number == '' ? '0' : number);
else {
  var mod = number.length % 3;
  var output = (mod == 0 ? '' : (number.substring(0, mod)));
  for (let i = 0; i < Math.floor(number.length / 3); i++) {
    if ((mod == 0) && (i == 0))
      output += number.substring(mod + 3 * i, mod + 3 * i + 3);
    else
      output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
  }
  console.log(milliFormat('11123123231.3213'));
  return output;
}
}

function outputmoney(number) {
  number = number.replace(/\,/g, "");
  if(isNaN(number) || number == "")return "";
  number = Math.round(number * 100) / 100;
    if (number < 0)
      return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
    else
      return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
}

function outputcents(amount) {
  amount = Math.round(((amount) - Math.floor(amount)) * 100);
  return (amount < 10 ? '.0' + amount : '.' + amount);
}
export const milliFormat = (s) => { //添加千位符
  if(/[^0-9\.]/.test(s)) return "invalid value";
  s=s.replace(/^(\d*)$/,"$1.");
  s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
  s=s.replace(".",",");
  var re=/(\d)(\d{3},)/;
  while(re.test(s)){
      s=s.replace(re,"$1,$2");
  }
  s=s.replace(/,(\d\d)$/,".$1");
  return s.replace(/^\./,"0.")
}

export const getTimeStamp = () => {
    return new Date().getTime();
}

export const getTime = () => {
    return Date.parse(new Date());
}

export const IsNumber = (data) => {
    const reg = new RegExp(/^\d+$/);
    return reg.test(data);
}

// 日期(年月日)转时间戳
export const DateToTimeStamp = (date) => {
    date = date.replace('年','-').replace('月','-').replace('日','');
    let timestamp2 = Date.parse(new Date(date));
    timestamp2 = timestamp2 / 1000;
    return timestamp2;
}

export const isChinese = (temp) => {
    if (escape(temp).indexOf( "%u" ) <0) {
        return false ;
    }
    return true;
}

export const assign = typeof Object.assign == 'function' ? Object.assign : function (target){
    if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
    }
    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index];
        if (source != null) {
            for (var key in source) {
                if (hasOwn.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
    }
    return target;
}

