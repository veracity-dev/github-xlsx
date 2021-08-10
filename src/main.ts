import { Octokit } from "@octokit/rest";
import readline from "readline";
var fs = require("fs");
const octokit = new Octokit({
  baseUrl: "https://api.github.com/search/issues?q=author:nalaka type:issue",
});

/**
 * Fetching all the issues
 * @param owner
 * @param repo
 */
async function getAllIssues(owner: string, repo: string) {


  try {
    const { data } = await octokit.rest.issues.listForRepo({
      owner: owner,
      repo: repo,
    });

    generateJsonFile(data);
  } catch (error) {
    console.log("Ërror", error);
  }
}

function generateJsonFile(jsonData: any) {
  console.log("Date : ", jsonData);
  fs.writeFile(
    "output/test.json",
    JSON.stringify(jsonData),
    function (err: Error) {
      if (err) {
        console.log(err);
      }
    }
  );
}

//user input
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("message ", (output) => {
//   console.log(`Hi ${output}!`)
//   rl.close();
// });


getAllIssues("veracity-dev","github-xlsx");
