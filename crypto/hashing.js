"use strict";

class Hashing {
  constructor() {
    this.crypto = require("crypto");
  }
  hash(password) {
    const buffer = Buffer.from(password);
    const salt = buffer.reduce((a, current, i) => a + password.charAt(i) + current, "");
    const strength = parseInt(buffer[0] + "" + password.length);
    const hashedPsw = this.crypto.pbkdf2Sync(password, salt, strength, 64, `sha512`).toString(`hex`);
    return hashedPsw;
  }

  compare(password, hashedPsw) {
    const buffer = Buffer.from(password);
    const strength = parseInt(buffer[0] + "" + password.length);
    const salt = buffer.reduce((a, current, i) => a + password.charAt(i) + current, "");
    const pswIsHashed = this.crypto.pbkdf2Sync(password, salt, strength, 64, `sha512`).toString(`hex`);
    return hashedPsw === pswIsHashed;
  }
}
module.exports = Hashing;
