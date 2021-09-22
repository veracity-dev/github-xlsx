import fs from "fs";

export function generateXlsxFile(jsonData: any) {
    const datePrefix = new Date().toJSON().slice(0, 16).replace('\:', '-');
    const fileName = `${datePrefix}-issues.xlsx`
    console.debug(`Using filename: ${fileName}`);

    var json2xls = require('json2xls');
    var xls = json2xls(jsonData);
    fs.writeFileSync(fileName, xls, 'binary');
}
