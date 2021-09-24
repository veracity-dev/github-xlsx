import fs from "fs";

export function generateXlsxFile(fileName: string, jsonData: any) {
    var json2xls = require('json2xls');
    var xls = json2xls(jsonData);
    fs.writeFileSync(`${fileName}.xlsx`, xls, 'binary');
}
