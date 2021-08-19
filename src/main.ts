import { Octokit } from "@octokit/rest";
var json2xls = require('json2xls');

const octokit = new Octokit({baseUrl: 'https://api.github.com'});
const prompt = require('prompt-sync')({sigint: true});
var fs = require("fs");

/**
 * Fetching all the issues
 * @param owner 
 * @param repo 
 * @param state
 */
 
async function getAllIssues() {
    try {

      const repo = prompt('Enter Repo Name: ');
      const owner = prompt('Enter Owner Name: ');

      const {data} = await octokit.rest.issues.listForRepo({
        owner: owner,
        repo: repo,
        state: 'all'
      })
  
      generateJsonFile(data.map(i => objectTransfer(i)));
      
    } catch (error) {
        console.log("Ërror",error);
        
    }
  }

function generateJsonFile(jsonData: any) {
  const now = new Date();
  const fileName = now.toJSON().slice(0,16).replace('\:', '-') + "_issues.xlsx"
  var xls = json2xls(jsonData);
  fs.writeFileSync(fileName, xls, 'binary');
  console.log("Date : ", jsonData);
}

function objectTransfer(jsonData: any){
  var pull_request = jsonData['pull_request']

  if(pull_request){
    return{}
  }else{
    return {
    'Number': jsonData['number'],
    'Title': jsonData['title'],
    'Creation_On' : jsonData['created_at'],
    'Last_Updated_On': jsonData['updated_at'],
    'Status': jsonData['state'],
    }
  }
}

getAllIssues();