import * as Excel from "exceljs";

export function generateXlsxFile(fileName: string, jsonData: any) {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Foo');
    var headers = [{header:'TITLE',key:'title',width:85},{header:'ISSUE_NUMBER',key:'number',width:20},{header:'ASSIGNEES',key:'assignee',width:150},{header:'LABEL',key:'label',width:35},{header:'AUTHOR',key:'author',width:20},{header:'BODY',key:'body'},{header:'STATE',key:'state'},{header:'CREATED_AT',key:'createdAt',width:25}]
    ws.columns = headers;
    ws.addRows(jsonData.map((x: any) => hyperlinkToTitle(x) ));
    wb.xlsx.writeFile(`${fileName}.xlsx`);
}
function hyperlinkToTitle(row : any){
    var title = { 
    hyperlink: row['url'],
    text: row['title'],
    }
    row['title'] = title;
    return row;
}

