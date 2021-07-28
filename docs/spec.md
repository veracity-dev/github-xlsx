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

### [OAuth app](https://github-issues-to-excel.netlify.app)  -This app asks for too much permissions on our GH account, so did not try it. But looked at src.
- [Github link](https://github.com/Joshua-rose/github-issues-to-excel/tree/master/src)

## Features

1) Work with local SSH credentials to connect to GitHub API
2) Basic project report - Main purpose of this Tool is to generate an Excel file which will contain all the Issue related details in a repository. Then the User will be able to    Export and download the Excel sheet.


### Basic project report

> Generate a report of all issues in the repository.

Command
```shell
gh-xlsx report basic
```

Options:
- `--all` Shows both open and close issues
- `--json` Saves the report as JSON file (instead of XLSX file)

Fields (columns)
- Number
- Label
- Title
- Creation On
- Created By
- Assignee
- Last Updated On
- Status (closed, open)

### Exporting Issues

Exports Number, Label, Title, Creation On, Created By, Assignee, Last Updated On, Status (closed or open).

Example generated excel file:
![WhatsApp Image 2021-07-28 at 1 13 16 AM](https://user-images.githubusercontent.com/79473294/127217707-80b805fe-7234-4b22-852e-5721cd727dae.jpeg)


### Tag wise project report

Generate a report labelwise:
![WhatsApp Image 2021-07-28 at 1 19 03 AM (1)](https://user-images.githubusercontent.com/79473294/127218402-708bc482-1086-46c5-be6c-139d3d4db2fe.jpeg)

### ...
