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
    if (Number.isNaN(Number.parseFloat(latitude))) throw new Error("Invalid latitude(!)");
    return Number.parseFloat(Number.parseFloat(latitude).toPrecision(10));
  }
  static parseLongitude(longitude) {
    if (Number.isNaN(Number.parseFloat(longitude))) throw new Error("Invalid latitude(!)");
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
  static isUrl(url) {
    try {
      const origin = new URL(url).origin;
      const urlValidator = /^(?:http(s)?:\/\/)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+(\.\w[a-zA-Z]{1,5})$/;
      return urlValidator.test(new URL(url).origin);
    } catch (error) {
      return false;
    }
  }
  static validateObjectKeys(object, keys = []) {
    const inValidKeys = keys.filter((k) => !object[k]);
    return inValidKeys;
  }
}

module.exports = Validator;
