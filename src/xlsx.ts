import * as Excel from "exceljs";

export function generateXlsxFile(fileName: string, jsonData: any) {
  const wb = new Excel.Workbook();
  const ws = wb.addWorksheet("Foo");
  var headers = [
    { header: "ISSUE_NUMBER", key: "number", width: 20 },
    { header: "STATE", key: "state" },
    { header: "ASSIGNEES", key: "assignee", width: 150 },
    { header: "TITLE", key: "title", width: 85 },
    { header: "UPDATED_AT", key: "updatedAt", width: 25 },
    { header: "CREATED_AT", key: "createdAt", width: 25 },
    { header: "LABEL", key: "labels", width: 20 },
    { header: "BODY", key: "body" },
  ];
  ws.columns = headers;
  ws.addRows(jsonData.map((x: any) => hyperlinkToTitle(x)));
  wb.xlsx.writeFile(`${fileName}.xlsx`);
}
function hyperlinkToTitle(row: any) {
  var title = {
    hyperlink: row["url"],
    text: row["title"],
  };
  row["title"] = title;
  return row;
}
