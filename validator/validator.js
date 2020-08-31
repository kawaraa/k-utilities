class Validator {
  static isString(str, minLength, maxLength) {
    let valid = true;
    if (!str || typeof str !== "string") return false;
    if (!Number.isNaN(Number.parseInt(minLength))) valid = str.length >= minLength;
    if (!Number.isNaN(Number.parseInt(maxLength))) valid = str.length <= maxLength;
    return valid;
  }
  static isNumber(num, min, max) {
    const N = Number.parseFloat(num);
    if (!Number.isNaN(N) && !max) return true;
    return !Number.isNaN(N) && N >= min && N <= max ? true : false;
  }
  static isDate(date) {
    return new Date(date).toString() !== "Invalid Date";
  }
  static parseLatitude(latitude) {
    return Number.parseFloat(Number.parseFloat(latitude).toPrecision(10));
  }
  static parseLongitude(longitude) {
    return Number.parseFloat(Number.parseFloat(longitude).toPrecision(11));
  }
  static areValidItems(availableItems, itemsToBeValidated) {
    const result = { allValid: false, valid: [], invalid: [] };
    if (!Array.isArray(availableItems)) throw new Error(`First argument should be an array.`);

    if (!Array.isArray(itemsToBeValidated)) {
      if (typeof itemsToBeValidated === "string") itemsToBeValidated = itemsToBeValidated.toLowerCase();
      const validItem = availableItems.find((item) => {
        if (typeof item === "string") item = item.toLowerCase();
        return item === itemsToBeValidated;
      });
      if (validItem) {
        result.allValid = true;
        result.valid.push(validItem);
      }
    } else {
      itemsToBeValidated.forEach((item) => {
        if (typeof item === "string") item = item.toLowerCase();
        const validItem = availableItems.find((i) => {
          if (typeof i === "string") i = i.toLowerCase();
          return i === item;
        });
        if (validItem) valid.push(validItem);
        if (!validItem) invalid.push(validItem);
        if (invalid.length === 0) result.valid = true;
      });
    }

    return result;
  }

  static stringToArray(string) {
    string = string.replace(/\s/g, "");
    if (string.slice(-1) === ",") string = string.slice(0, string.length - 1);
    return string ? string.split(",") : [];
  }
  static convertToURLEncoded(obj) {
    const query = [];
    for (let key in obj) {
      query.push(`${key}=${obj[key]}`);
    }
    return `?${query.join("&")}`;
  }
  static parseUREncoded(url) {
    if (url.length < 3) return "";
    let obj = {};
    let query = url.replace("?", "").split("&");
    for (let i = 0; i < query.length; i++) {
      let pair = query[i].split("=");
      obj[pair[0]] = pair[1];
    }
    return obj;
  }
  static dateToString(date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
  }
  static dateToText(date) {
    const dateFormat = { month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
    const todayDate = new Date();
    const eventDate = new Date(date);
    const theTime = eventDate.toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" });
    let theDate = eventDate.toLocaleDateString("default", dateFormat);
    let seconds = (Date.parse(eventDate) - Date.parse(todayDate)) / 1000;

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

module.exports = Validator;
