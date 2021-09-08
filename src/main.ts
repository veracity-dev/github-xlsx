import { Octokit } from "@octokit/rest";
import { type } from "os";
var json2xls = require('json2xls');
const { graphql } = require("@octokit/graphql");

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

function load() {
  const repo = prompt('Enter Repo Name: ');
  const owner = prompt('Enter Owner Name: ');
  const token = prompt('Enter Token: ');

  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `bearer ${token}`,
    },
  });

  const repos = repository(owner, repo, graphqlWithAuth);
  
  repos.then(x => {
    const rr = <response> x;
    generateJsonFile(rr.repository.issues.nodes);
    console.log(JSON.stringify(rr));
    console.log(rr.repository.issues.nodes[2].assignees); //getting assignees
    console.log(rr.repository.issues); // printing issues
    console.log(rr);
  }).catch(e => console.log(e));

}


// const getGraphqlWithAuth = (token: string) => { 
//   return graphql.defaults({
//     headers: {
//       authorization: `bearer ${token}`,
//     },
//   })
// };

//query making
const repository = async (owner: string, repo: string, graphqlWithAuth: any) => {
  return await graphqlWithAuth(`
  {
    repository(owner: "${owner}", name: "${repo}") {
      issues(last: 100) {
        nodes {
          title,
          body,
          url,
          assignees(first:100){
            nodes{
              avatarUrl
              name
              url
            }
          }
        }
      }
    }
  }
`);
}
type assignees = {
  avatarUrl : string,
  name : string,
  url :string

}
type assigneeNode = {
  node: assignees []
}
type node = {
  title: string,
  body: string,
  url : string,
  assignees : assigneeNode
}

type issues = {
  nodes: node[] 
}

type repository = {
  issues: issues
}

type response = {
  repository: repository
}

// repository("veracity-dev", "github-xlsx").then(x => {
//   // const rr = <response> x;
//   console.log(JSON.stringify(x));
//   //console.log(rr.repository.issues.nodes[2].assignees); //getting assignees
//   // console.log(rr.repository.issues); // printing issues
//   // console.log(rr);
  
// }).catch(e => console.log(e));

load();

//getAllIssues();