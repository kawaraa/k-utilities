"use strict";

class Formatter {
  static newId() {
    return (Math.random() + Date.now() + Math.random() + "").replace(".", "");
  }
  static getRandomHexColor() {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`;

    // // Second way: Generate random values for RGB components
    // const componentHex = () =>
    //   Math.floor(Math.random() * 256)
    //     .toString(16)
    //     .padStart(2, "0");
    // return "#" + componentHex() + componentHex() + componentHex();
  }

  static objectToURLEncoded(obj) {
    const query = [];
    for (let key in obj) query.push(`${key}=${obj[key]}`);
    return `?${query.join("&")}`;
  }

  static parseURLEncoded(url) {
    let obj = {};
    try {
      url = new URL(url);
    } catch (error) {
      return obj;
    }
    let query = url.search.replace("?", "").split("&");
    for (let i = 0; i < query.length; i++) {
      let pair = query[i].split("=");
      obj[pair[0]] = pair[1];
    }
    return obj;
  }

  static stringToArray(string = "", separator = ",") {
    string = string.trim();
    if (string.slice(-1) === separator) string = string.slice(0, string.length - 1);
    return string ? string.split(separator) : [];
  }

  static stringToBinary(string) {
    let binary = "",
      length = string.length;
    for (let i = 0; i < length; i += 1) {
      binary += string.charCodeAt(i).toString(2) + (length - 1 === i ? "" : " ");
    }
    return binary;
  }

  static binaryToString(binary) {
    const binArray = binary.split(" ");
    let string = "",
      length = binArray.length;
    for (let i = 0; i < length; i += 1) string += String.fromCharCode(Number.parseInt(binArray[i], 2));
    return string;
  }

  static dataFormToObject() {
    const data = {};
    Array.from(form.keys()).forEach((key) => (data[key] = form[key].value));
    return data;
  }

  // static dateToString(date) {
  //   const d = new Date(date);
  //   return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
  // }

  static dateToText(date) {
    const dateFormat = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    const eventDate = new Date(date);
    const theTime = eventDate.toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" });
    let theDate = eventDate.toLocaleDateString("default", dateFormat);
    let seconds = (Date.parse(eventDate) - Date.now()) / 1000;

    if (Number.isNaN(seconds)) throw Error("Invalid Date(!)");
    let mins = Math.ceil(seconds / 60);
    let hrs = Math.round(mins / 60);
    let days = Math.round(hrs / 24);
    let weeks = Math.round(days / 7);

    if (seconds > 0) {
      if (seconds < 60) return `in less then a min`;
      if (mins < 60) return `in ${mins} mins`;
      if (days == 0 && hrs < 24) return `today at ${theTime}`;
      if (days === 1) return `tomorrow at ${theTime}`;
      if (days > 1 && days < 7) return `in ${days} days`;
      if (days === 7) return `in a week`;
      if (weeks > 1 && weeks < 4) return `in ${weeks} weeks`;
      theDate = `on ${theDate}`;
    } else {
      seconds = seconds * -1;
      mins = Math.ceil(seconds / 60);
      hrs = Math.round(mins / 60);
      days = Math.round(hrs / 24);
      weeks = Math.round(days / 7);

      if (seconds < 60) return `less then a min ago`;
      if (mins < 60) return `${mins} mins ago`;
      if (days == 0 && hrs < 24) return `${hrs} hrs ago`;
      if (days === 1) return `yesterday at ${theTime}`;
      if (days > 1 && days < 7) return `${days} days ago`;
      if (days === 7) return `a week ago`;
      if (weeks > 1 && weeks < 4) return `${weeks} weeks ago`;
      theDate = `was on ${theDate}`;
    }
    return theDate;
  }
}
module.exports = Formatter;
