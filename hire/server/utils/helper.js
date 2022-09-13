const atob = require("atob");
const crypto = require("crypto");
const CryptoJS = require('crypto-js');
const keys = require('../config/keys');

const passMatch = keys.encryptKey;
const keySize = 256;
const iterations = 100;

const encrypt = (msg) => {
    let salt = CryptoJS.lib.WordArray.random(128 / 8);

    let key = CryptoJS.PBKDF2(passMatch, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    let iv = CryptoJS.lib.WordArray.random(128 / 8);

    let encrypted = CryptoJS.AES.encrypt(msg, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC

    });

    let encryptContent = salt.toString() + iv.toString() + encrypted.toString();
    return encryptContent;
}

const decrypt = (encryptContent) => {
    let salt = CryptoJS.enc.Hex.parse(encryptContent.substr(0, 32));
    let iv = CryptoJS.enc.Hex.parse(encryptContent.substr(32, 32))
    let encrypted = encryptContent.substring(64);

    let key = CryptoJS.PBKDF2(passMatch, salt, {
        keySize: keySize / 32,
        iterations: iterations
    });

    let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        iv: iv,
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    })
    return decrypted.toString(CryptoJS.enc.Utf8);
}

const encryptCode = (code) => {
    let secret_key = "chalkst";
    let secret_iv = "chalkst123";

    let key = crypto.createHash("sha256").update(secret_key).digest("hex");
    let iv = crypto.createHash("sha256").update(secret_iv).digest("hex");
    iv = iv.substr(0, 16);
    key = key.substr(0, 32);

    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(code, "utf8", "base64");
    encrypted += cipher.final("base64");

    //encoding to base 64
    encrypted = Buffer.from(encrypted).toString("base64");

    return encrypted;
};

const decryptCode = (code) => {
    let secret_key = "chalkst";
    let secret_iv = "chalkst123";

    let key = crypto.createHash("sha256").update(secret_key).digest("hex");
    let iv = crypto.createHash("sha256").update(secret_iv).digest("hex");
    iv = iv.substr(0, 16);
    key = key.substr(0, 32);
    code = atob(code);

    let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(code, "base64", "utf8");
    return decrypted + decipher.final("utf8");
};

const genRandomString = (length) => {
    let strResult = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return strResult.split('').sort(function () { return 0.5 - Math.random() }).join('').slice(0, length);
}

const encryptContent = (code, secretKey) => {
    let secret_key = secretKey;
    let secret_iv = "R1NQOTM4TjROM3l1N1pFbTlhc0FZZz09";

    let key = crypto.createHash("sha512").update(secret_key).digest("hex");
    let iv = crypto.createHash("sha512").update(secret_iv).digest("hex");
    iv = iv.substr(0, 16);
    key = key.substr(0, 32);

    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(code, "utf8", "base64");
    encrypted += cipher.final("base64");

    //encoding to base 64
    encrypted = Buffer.from(encrypted).toString("base64");

    return encrypted;
}

module.exports = {
    encrypt,
    decrypt,
    encryptCode,
    decryptCode,
    genRandomString,
    encryptContent
}