const forge = require('node-forge');

/**
* Class for encrypting and decrypting payloads.
* @class
* @param {Object} options - options for constructing a TuyaCipher
* @param {String} options.key - localKey of cipher
* @example
* const cipher = new TuyaCipher({key: 'xxxxxxxxxxxxxxxx'})
*/
function TuyaCipher(options) {
  this.cipher = forge.cipher.createCipher('AES-ECB', options.key);
  this.decipher = forge.cipher.createDecipher('AES-ECB', options.key);
}

/**
* Encrypts data.
* @param {Object} options - options for encryption
* @param {String} options.data - data to encrypt
* @param {Boolean} [options.base64=true] - `true` to return result in Base64
* @example
* TuyaCipher.encrypt({data: 'hello world'})
* @returns {Buffer} - returns buffer unless options.base64 is true
*/
TuyaCipher.prototype.encrypt = function (options) {
  this.cipher.start({iv: ''});
  this.cipher.update(forge.util.createBuffer(options.data, 'utf8'));
  this.cipher.finish();

  if (options.base64 != false) {
    return forge.util.encode64(this.cipher.output.data);
  }

  return this.cipher.output;
};

TuyaCipher.prototype.decrypt = function (options) {
  decipher.start({iv: ''});
  decipher.update(options.data);
  const result = decipher.finish();

  return decipher.output.toHex();
};

TuyaCipher.prototype.MD5 = function (data) {
  const md5hash = forge.md.md5.create().update(data).digest().toHex();
  return md5hash.toString().toLowerCase().substr(8, 16);
};

module.exports = TuyaCipher;