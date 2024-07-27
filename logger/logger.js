"use strict";

class Logger {
  constructor(name = "", includeTimestamp) {
    this.name = name;
    this.withTime = includeTimestamp;
  }
  #getTime() {
    const d = new Date();
    const ops = { hour12: false };
    return !this.withTime ? "" : `[${d.toJSON().substring(0, 10)} ${d.toLocaleTimeString([], ops)}]`;
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
