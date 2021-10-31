import SecureStorage from "secure-web-storage";
import CryptoJS from "crypto-js";
let SECRET_KEY = "my secret key";

let secureStorage = new SecureStorage(localStorage, {
  hash: function hash(key) {
    key = CryptoJS.SHA256(key, SECRET_KEY);

    return key.toString();
  },
  encrypt: function encrypt(data) {
    data = CryptoJS.AES.encrypt(data, SECRET_KEY);

    data = data.toString();

    return data;
  },
  decrypt: function decrypt(data) {
    data = CryptoJS.AES.decrypt(data, SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
  },
});

const EncrytionObj = (data, key) => {
  if (data && key) {
    secureStorage.setItem(key, data);
  }
};

const DescrytionObj = (key) => {
  if (key) {
    return secureStorage.getItem(key);
  }
};
const removeObj = () => {
  secureStorage.clear();
};

export { EncrytionObj, DescrytionObj, removeObj };
