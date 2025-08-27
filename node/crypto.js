import crypto from "node:crypto";

export default class Crypto {
  // to get a key run in terminal: openssl rand 16 -hex
  // Note: the same key is used when password encrypted should be used to decrypt the password
  constructor(key) {
    this.crypto = crypto;
    this._key = Buffer.from(key, "hex"); // a-32-byte-long-key-here!
    this._keyLength = 256;
    this._ivLength = 16; // size
    this._algorithm = `aes-${this._keyLength}-cbc`;
  }

  encrypt(value) {
    if (!this._key?.length) throw new Error("'key' is required for encryption.");
    const iv = this.crypto.randomBytes(this._ivLength);
    const cipher = this.crypto.createCipheriv(this._algorithm, Buffer.from(this._key), iv);
    let encrypted = cipher.update(value, "utf8");
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${encrypted.toString("hex")}:${iv.toString("hex")}`;
  }

  decrypt(value) {
    if (!this._key?.length) throw new Error("'key' is required for encryption.");

    const [encrypted, iv] = value.split(":");
    const decipher = this.crypto.createDecipheriv(
      this._algorithm,
      Buffer.from(this._key),
      Buffer.from(iv, "hex")
    );
    let decrypted = decipher.update(Buffer.from(encrypted, "hex"));
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString("utf8");
  }

  newPassword(strength = 1) {
    const length = 8 * strength;
    return this.crypto.randomBytes(length).toString("hex");
  }
}

// #  Generate 32-byte-long-key Using openssl (if installed)
// openssl rand -hex 32

// # Generate 32-byte-long-key Using Node.js one-liner
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

// const newCrypto = new Crypto("465cfad3b165ee7443ef1e38fab7383721a66823b9d957d34fa2dd7dd73958e9");

// // Methods are now async:
// const encrypted = newCrypto.encrypt("Test data to be encrypted");
// const decrypted = newCrypto.decrypt(encrypted);
// const newPassword = newCrypto.newPassword(2);

// console.log("encrypted:", encrypted);
// console.log("decrypted:", decrypted);
// console.log("newPassword:", newPassword);
