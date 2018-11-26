const Crypto = require('crypto');


const randomString = (len = 32) => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_$';
    console.log(possible.length)
    for (let i = 0; i < len; i += 1) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return `${text}`;
}

const type = 'aes-192-ecb';
const clearEncoding = 'utf8'
const cipherEncoding = 'base64'
// 对称加密
const aesHandle = function encrypt(data, key) {
    console.log(data)
    const cipherChunks = []
    const cipher = Crypto.createCipheriv(type, key, '')
    cipher.setAutoPadding(true)
    cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding))
    cipherChunks.push(cipher.final(cipherEncoding))
    return cipherChunks.join('').replace(/[+]/g, '-').replace(/[/]/g, '_');
  };

// 读取数据

function handleFiles(data) {
    const randomaeskey = randomString(24);
    const value = Object.keys(data);
    const binanyArr = value.map((item) => {
        return aesHandle(data[item], randomaeskey)
    })
    console.log(binanyArr)
}

function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
handleFiles({
      num: '1'
  })