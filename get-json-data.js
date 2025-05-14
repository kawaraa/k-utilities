import { createRequire } from "module";

export function getJsonData(dataName = "countries") {
  if (!["countries", "categories"].includes(dataName)) throw new Error("Invalid 'dataName'");
  return createRequire(import.meta.url)(`./data/${dataName}.json`);
}
