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
}
