class Logger {
  constructor(name = "") {
    this.name = name;
  }
  info() {
    console.log(`[###]-[${this.name}] `, ...arguments);
  }
  warn() {
    console.warn(`[!!!]-[${this.name}] `, ...arguments);
  }
  error() {
    console.error(`[XXX]-[${this.name}] `, ...arguments);
  }
}

module.exports = Logger;
