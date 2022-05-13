import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('67a2c2fccde43eac');
const iv = CryptoJS.enc.Utf8.parse('2a3156ec092dcb8d');

export function encrypt(input) {
	var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(input), key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export function decrypt(input) {
	var decrypt = CryptoJS.AES.decrypt(CryptoJS.enc.Base64.stringify(CryptoJS.enc.Base64.parse(input)), key, {
		iv: iv,
		mode: CryptoJS.mode.CBC,
		padding: CryptoJS.pad.Pkcs7
	});
	var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
	return decryptedStr.toString();
}
