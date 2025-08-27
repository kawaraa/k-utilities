export default class Crypto {
  constructor(key) {
    this.crypto = crypto;
    this._key = this._hexToBytes(key); // a-32-byte-long-key-here!
    this._algorithm = "AES-CBC";
    this._keyLength = 256;
    this._ivLength = 16; // size
  }

  // Helper to convert hex string to Uint8Array
  _hexToBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return bytes;
  }
  // Helper to convert Uint8Array to hex string
  _bytesToHex(bytes) {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }

  async encrypt(value) {
    if (!this._key?.length) throw new Error("'key' is required for encryption.");

    const iv = crypto.getRandomValues(new Uint8Array(this._ivLength));
    const importedKey = await crypto.subtle.importKey("raw", this._key, { name: this._algorithm }, false, [
      "encrypt",
    ]);
    const algorithm = { name: this._algorithm, iv: iv };
    const encrypted = await crypto.subtle.encrypt(algorithm, importedKey, new TextEncoder().encode(value));
    // return `${Buffer.from(encrypted).toString("hex")}:${Buffer.from(iv).toString("hex")}`;
    return `${this._bytesToHex(new Uint8Array(encrypted))}:${this._bytesToHex(iv)}`;
  }

  async decrypt(value) {
    if (!this._key?.length) throw new Error("'key' is required for decryption.");

    const [encryptedHex, ivHex] = value.split(":");
    const encryptedBytes = this._hexToBytes(encryptedHex);
    const iv = this._hexToBytes(ivHex);

    const importedKey = await crypto.subtle.importKey("raw", this._key, { name: this._algorithm }, false, [
      "decrypt",
    ]);

    const algorithm = { name: this._algorithm, iv };
    const decrypted = await crypto.subtle.decrypt(algorithm, importedKey, encryptedBytes);

    return new TextDecoder().decode(decrypted);
  }

  newPassword(strength = 1) {
    const length = 8 * strength;
    return this._bytesToHex(crypto.getRandomValues(new Uint8Array(length)));
  }
}

// #  Generate 32-byte-long-key Using openssl (if installed)
// openssl rand -hex 32

// # Generate 32-byte-long-key Using Node.js one-liner
// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

// const newCrypto = new Crypto("465cfad3b165ee7443ef1e38fab7383721a66823b9d957d34fa2dd7dd73958e9");

// // Methods are now async:
// const encrypted = await newCrypto.encrypt("Test data to be encrypted");
// const decrypted = await newCrypto.decrypt(encrypted);
// const newPassword = newCrypto.newPassword(2);

// console.log("encrypted:", encrypted);
// console.log("decrypted:", decrypted);
// console.log("newPassword:", newPassword);
