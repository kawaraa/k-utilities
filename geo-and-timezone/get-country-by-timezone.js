const countries = require("../data/countries.json");
const countryCodes = Object.keys(countries);

module.exports = function getCountryByTimezone(timezone) {
  if (!timezone) return {};

  let countryCode = countryCodes.find((cc) => {
    const [aContinent, aProvince, aCity] = timezone.toLowerCase().replaceAll("-", " ").split("/");
    const { continent, name, provinces } = countries[cc];
    const cities = Object.keys(provinces)
      .map((p) => [p, ...provinces[p]])
      .flat();

    if (
      (continent.includes(aContinent) && cities.includes(aCity)) ||
      cities.includes(aProvince) ||
      (aCity && name.includes(aCity)) ||
      (aProvince && name.includes(aProvince))
    ) {
      return cc;
    }
  });

  if (!countryCode) {
    countryCode = countryCodes.find((cc) => {
      const aContinent = timezone.toLowerCase().split("/")[0];
      const { continent, timezones } = countries[cc];

      if (continent.includes(aContinent) && timezones.find((tz) => tz.includes(timezone.toLowerCase()))) {
        return cc;
      }
    });
  }

  if (!countryCode) return {};

  return { code: countryCode, name: countries[countryCode].name, city: aCity || aProvince };
};
