# Product specification

## Scope

A CLI (Command Line Interface) tool that exports issues in a GitHub repository to XLSX format files useful for project managers.

## Similar products

### GitHub CLI

The official [GitHub CLI](https://cli.github.com) allows:
- Clone Repo
- Create Repo
- Create Issues
- Checkout PR
- ...

### Other tools

### [OAuth app](https://github-issues-to-excel.netlify.app)  --This app asks for too much permissions on our GH account, so did not try it. But looked at src.
- [Github link](https://github.com/Joshua-rose/github-issues-to-excel/tree/master/src)

## Features

- Accepts Inputs
- Display Progress
- Build/Export Excel files
- Work with local SSH credentials to connect to GitHub API

## Usage

### Installations

```
npm install --global node-xlsx
```
## Workflow

### 1.Parsing a xlsx from file/buffer, outputs an array of worksheets

```typescript
import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

// Parse a buffer
const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(`${__dirname}/myFile.xlsx`));
// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);

```
### 2.Building a xlsx

```typescript

import xlsx from 'node-xlsx';
// Or var xlsx = require('node-xlsx').default;

const data = [[1, 2, 3], [true, false, null, 'sheetjs'], ['foo', 'bar', new Date('2014-02-19T14:30Z'), '0.3'], ['baz', null, 'qux']];
var buffer = xlsx.build([{name: "mySheetName", data: data}]); // Returns a buffer
```

### Exporting Issues

Exports Issue title, Issue Number, Issue Date, Last Updated date, status (closed or open).



