import { Octokit } from "@octokit/rest";
import { appendFile } from "fs";
import { type } from "os";
var json2xls = require('json2xls');
const { graphql } = require("@octokit/graphql");
//const flatten = require("flat").flatten;

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
//convert object to xlsx
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
    const rr = <response> x; //cast (x) = retrieving data
    const json = JSON.parse(JSON.stringify(x))
    console.log(JSON.stringify(json['repository']['issues']['nodes']));
    generateJsonFile(json['repository']['issues']['nodes'].map((y: any) => mapIssue(y)));
    
    // console.log(rr.repository.issues.nodes[2].assignees); //getting assignees
    // console.log(rr.repository.issues); // printing issues
    // console.log(rr);
  }).catch(e => console.log(e));

}
const mapIssue = function(json: any) : any{
  const out: row = {
    number : json['number'],
    title: json['title'],
    state: json ['state'],
    author: json['author']['login'],
    body: json ['body'],
    createdAt: json ['createdAt'],
    lastEditedAt: json ['lastEditedAt'],
    //milestone: json['milestone']['description'],
    label: json['labels']['nodes'].map((x: any) => x['id']).join(", "),
    assignee: json['assignees']['nodes'].map((x: any) => x['name']).join(", ")


  }
  return out;
}

type row = {
  number: number,
  title: string,
  state: string,
  author: string,
  body: string,
  createdAt: string,
  lastEditedAt: string,
  //milestone: string,
  label: string,
  assignee: string
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
          state
          number
          labels(first: 10){
            nodes{
              id
            }
          }
          title
          createdAt
          author{
           login
          }
          body
          lastEditedAt
          milestone{
            description
          }
          assignees(first:10){
            nodes{
             name
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
  number: string,
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