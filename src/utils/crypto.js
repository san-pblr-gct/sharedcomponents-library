const CryptoJS = require('crypto-js');

const crypto = {
  // Method to encrypt any data. First data will be converted into JSON after that will be encrypted using current host.
  encrypt: function encrypt(data) {
    if (data == null)
      return data;
    return CryptoJS.AES.encrypt(JSON.stringify(data), window.location.host).toString();
  },

  // Method to decrypt any data. First data will be decrypted to bytes after that will be converted to json and parsed back to string.
  decrypt: function decrypt(data) {
    if (data == null)
      return data;
    const bytes = CryptoJS.AES.decrypt(data, window.location.host);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }
};
export default crypto;