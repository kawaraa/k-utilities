// Address validation
// country code ISO 3166-1 alpha-2: ( should be Two letter )
// state, county, province, or region: ( should be max 85 length )
// city, district, suburb, town, or village: ( should be max 85 length )
// postalCode, ZIP code: ( should be between 4 and 10 numbers and letters )
// line1, street + apartment, suite, unit, or building: ( should be max 150 length )

export default class Normalizer {
  static extractNumbers(string = "") {
    string.match(/\d+\.?\d*/g)?.map(Number);
  }
  static parseLatitude(latitude) {
    if (Number.isNaN(Number.parseFloat(latitude))) throw new Error("Invalid latitude(!)");
    return Number.parseFloat(Number.parseFloat(latitude).toPrecision(10));
  }
  static parseLongitude(longitude) {
    if (Number.isNaN(Number.parseFloat(longitude))) throw new Error("Invalid latitude(!)");
    return Number.parseFloat(Number.parseFloat(longitude).toPrecision(11));
  }

  static objectToURLEncoded(obj) {
    const query = [];
    for (let key in obj) query.push(`${key}=${obj[key]}`);
    return `?${query.join("&")}`;
  }

  static parseURLEncoded(url) {
    let obj = {};
    try {
      url = new URL(url).search;
    } catch (error) {
      if (!url?.includes("?")) return obj;
    }

    let query = url.slice(url.indexOf("?") + 1).split("&");
    for (let i = 0; i < query.length; i++) {
      let pair = query[i].split("=");
      if (pair[0] && obj[pair[0]]) {
        obj[pair[0]] = pair.length <= 2 ? pair[1] : pair.slice(1).join("=");
      }
    }
    return obj;
  }

  static stringToBinary(string) {
    let binary = "",
      length = string.length;
    for (let i = 0; i < length; i += 1) {
      binary += string.codePointAt(i).toString(2) + (length === i + 1 ? "" : " ");
    }
    return binary;
  }

  static binaryToString(binary) {
    const binArray = binary.split(" ");
    let string = "",
      length = binArray.length;
    for (let i = 0; i < length; i += 1) {
      string += String.fromCodePoint(Number.parseInt(binArray[i], 2));
    }
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
