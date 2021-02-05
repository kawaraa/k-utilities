"use strict";

class Crypto {
  // to get a key run in terminal: openssl rand 16 -hex
  // Note: the same key is used when password encrypted should be used to decrypt the password
  constructor(key) {
    this.crypto = require("crypto");
    this._key = key;
    this._algorithm = "aes-256-cbc";
    this._size = 16;
  }

  encrypt(value) {
    const buffer = this.crypto.randomBytes(this._size);
    const cipher = this.crypto.createCipheriv(this._algorithm, Buffer.from(this._key), buffer);
    let encrypted = cipher.update(Buffer.from(value));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString("hex") + ":" + buffer.toString("hex");
  }

  decrypt(value) {
    const textParts = value.split(":");
    const buffer = Buffer.from(textParts[1], "hex");
    const encryptedText = Buffer.from(textParts.join(":"), "hex");
    const decipher = this.crypto.createDecipheriv(this._algorithm, Buffer.from(this._key), buffer);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}

module.exports = Crypto;
