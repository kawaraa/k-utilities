"use strict";

class Logger {
  constructor(name = "", includeTimestamp) {
    this.name = name;
    this.withTime = includeTimestamp;
  }
  #getTime() {
    const d = new Date();
    return !this.withTime ? "" : `${d.toJSON().substring(0, 10)} ${d.toLocaleTimeString()}`;
  }
  info() {
    console.log(`[###]-[${this.name}]${this.#getTime()} `, ...arguments);
  }
  warn() {
    console.warn(`[!!!]-[${this.name}]${this.#getTime()} `, ...arguments);
  }
  error() {
    console.error(`[XXX]-[${this.name}]${this.#getTime()} `, ...arguments);
  }
}

module.exports = Logger;
