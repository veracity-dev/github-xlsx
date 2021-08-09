import { Octokit } from "@octokit/rest";
const octokit = new Octokit({baseUrl: 'https://api.github.com/search/issues?q= type:issue'});

/**
 * Fetching all the issues
 * @param owner 
 * @param repo 
 */
async function getAllIssues(owner:string,repo:string) {
    try {
      const {data} = await octokit.rest.issues.listForRepo({
        owner: owner,
        repo: repo
      });;
  
      generateJsonFile(data)
      
    } catch (error) {
        console.log("Ërror",error);
        
    }
  }

function generateJsonFile(data: any) {
  console.log("Date : ", data);
}


getAllIssues("veracity-dev","github-xlsx");


