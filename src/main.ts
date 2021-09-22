import {load} from "./gh";
import { generateXlsxFile} from "./xlsx";
import { exit } from "process";

// Need the GitHub PAT
const GH_PAT = process.env.GH_PAT;
if (!GH_PAT) {
  console.error("Please define GH_PAT enviornment variable")
  console.log("and set it to your GitHub Persosnal Access Token.")
  exit(0);
}

// Need the GitHub repo name in org-name/repo-name format
if (process.argv.length < 3) {
  console.error("Repo should be specified")
  console.error("Usage:")
  console.error("node main.js veracity-dev/github-xlsx")  
  exit(0);
}
const REPO = process.argv[2];

// TODO: Check if REPO string is in org-name/repo-name format
const [ownerName, repoName] = REPO.split('/');
if (!repoName) {
  console.error("Repo name is required")
  console.error("Usage:")
  console.error("node main.js veracity-dev/github-xlsx")
  exit(0);
}
console.log(`Working with ${ownerName}/${repoName}`);


(async function() {
  const reportData = await load(ownerName, repoName, GH_PAT);
  // console.log(reportData);

  await generateXlsxFile(reportData);
})();

