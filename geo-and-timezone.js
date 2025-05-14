// geo-and-timezone utility that helps detect the country though the timezone
import getJsonData from "./get-json-data.js";
const countryCodes = Object.keys(getJsonData("countries"));

export default function getCountryByTimezone(timezone) {
  if (!timezone) return {};
  const [aContinent, aProvince, aCity] = timezone.toLowerCase().replaceAll("-", " ").split("/");

  let countryCode = countryCodes.find((cc) => {
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
      const { continent, timezones } = countries[cc];

      if (continent.includes(aContinent) && timezones.find((tz) => tz.includes(timezone.toLowerCase()))) {
        return cc;
      }
    });
  }

  if (!countryCode) return {};

  return { country: countryCode, name: countries[countryCode].name, city: aCity || aProvince };
}
