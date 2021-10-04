import fs from "fs";

export function generateJsonFile(fileName: string, data: any) {
  var jsonString = JSON.stringify(data);
  fs.writeFileSync(`${fileName}.json`, jsonString);
}
