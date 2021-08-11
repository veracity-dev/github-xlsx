import { Octokit } from "@octokit/rest";
//const octokit = new Octokit({baseUrl: 'https://api.github.com/search/issues?q=author:nalaka type:issue'});
const octokit = new Octokit({baseUrl: 'https://api.github.com'});
const prompt = require('prompt-sync')({sigint: true});
var fs = require("fs");

/**
 * Fetching all the issues
 * @param owner 
 * @param repo 
 */
 
async function getAllIssues(owner:string,repo:string) {
    try {

      const repo = prompt('Enter Repo Name: ');
     //console.log(`Repo name is ${repo}`);
      const owner = prompt('Enter Owner Name: ');
      //console.log(`Owner name is ${owner}`);

      const {data} = await octokit.rest.issues.listForRepo({
        owner: owner,
        repo: repo
      });;
  
      generateJsonFile(data)
      
    } catch (error) {
        console.log("Ërror",error);
        
    }
  }

function generateJsonFile(jsonData: any) {
  console.log("Date : ", jsonData);
  fs.writeFile(
    "output.json",
    JSON.stringify(jsonData),
    function (err: Error) {
      if (err) {
        console.log(err);
      }
    }
  )
}


getAllIssues("veracity-dev","github-xlsx");


