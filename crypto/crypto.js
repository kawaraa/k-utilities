const crypto = require ? require("crypto") : await import("node:crypto");

class Crypto {
  // to get a key run in terminal: openssl rand 16 -hex
  // Note: the same key is used when password encrypted should be used to decrypt the password
  constructor(key) {
    if (!key || !(key?.length > 2)) throw new Error("'key' is required for encryption.");
    this.crypto = crypto;
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

  hash(password) {
    const buffer = Buffer.from(password);
    const salt = buffer.reduce((a, current, i) => a + password.charAt(i) + current, "");
    const strength = parseInt(buffer[0] + "" + password.length);
    const hashedPsw = this.crypto.pbkdf2Sync(password, salt, strength, 64, `sha512`).toString(`hex`);
    return hashedPsw;
  }

  compare(password, hashedPassword) {
    const buffer = Buffer.from(password);
    const strength = parseInt(buffer[0] + "" + password.length);
    const salt = buffer.reduce((a, current, i) => a + password.charAt(i) + current, "");
    const hashedPsw = this.crypto.pbkdf2Sync(password, salt, strength, 64, `sha512`).toString(`hex`);
    return hashedPassword === hashedPsw;
  }
}

module.exports = Crypto;
