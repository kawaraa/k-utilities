export default class Formatter {
  static toJSON(data) {
    try {
      const json = JSON.stringify(data);
      return json;
    } catch (e) {}
    return data;
  }
  static parseJSON(data) {
    try {
      const json = JSON.parse(data);
      return json;
    } catch (e) {}
    return data;
  }

  static newId(num) {
    if (!num) return crypto.randomUUID();
    return +(Math.random() + Date.now() + Math.random() + "").replace(".", "");
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
}
