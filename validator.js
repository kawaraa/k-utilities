// Address validation
// country code ISO 3166-1 alpha-2: ( should be Two letter )
// state, county, province, or region: ( should be max 85 length )
// city, district, suburb, town, or village: ( should be max 85 length )
// postalCode, ZIP code: ( should be between 4 and 10 numbers and letters )
// line1, street + apartment, suite, unit, or building: ( should be max 150 length )

export default class Validator {
  static isString(str, minLength, maxLength) {
    if (!str || typeof str !== "string") return false;
    if (minLength && minLength > str.length) false;
    if (maxLength && maxLength < str.length) false;
    return true;
  }
  static isNumber(num, min, max) {
    const N = Number.parseFloat(num);
    if (Number.isNaN(N)) return false;
    else if (min && min > N) return false;
    else if (max && max < N) return false;
    return true;
  }
  static isPhoneNumber(value) {
    const isPhoneNumber = !Number.isNaN(Number.parseInt(value));
    return value && value.length <= 15 && value.length > 10 && isPhoneNumber;
  }
  static isEmail(value) {
    const isEmail = /^[^\s@]+@[^\s@]+(\.[a-zA-Z]{1,5})+$/.test(value);
    // without TLD length validation --> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    return !!value && isEmail;
  }
  static isStrongPsw(value) {
    const pswValidator = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    return value && pswValidator.test(value);
  }
  static isDate(date) {
    return new Date(date).toString() !== "Invalid Date";
  }
  static parseLatitude(latitude) {
    if (Number.isNaN(Number.parseFloat(latitude))) throw new Error("Invalid latitude(!)");
    return Number.parseFloat(Number.parseFloat(latitude).toPrecision(10));
  }
  static parseLongitude(longitude) {
    if (Number.isNaN(Number.parseFloat(longitude))) throw new Error("Invalid latitude(!)");
    return Number.parseFloat(Number.parseFloat(longitude).toPrecision(11));
  }
  static isUrl(url) {
    try {
      const origin = new URL(url).origin;
      const urlValidator = /^(?:http(s)?:\/\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(\.\w[a-zA-Z]{1,5})$/;
      return urlValidator.test(origin);
    } catch (error) {
      return false;
    }
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
  static validateObjectKeys(object, keys = []) {
    const inValidKeys = keys.filter((k) => !object[k]);
    return inValidKeys;
  }
}
