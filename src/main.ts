import { Config, getConfig } from "./config";
import { getIssuesFromGH } from "./gh";
import { generateJsonFile } from "./json";
import { generateXlsxFile } from "./xlsx";
import { exit } from "process";

let config: Config;
try {
  config = getConfig();
} catch (error: any) {
  console.error(error.message);
  exit(0);
}

console.log(`Working with ${config.orgName}/${config.repoName}`);

(async function () {
  const reportData = await getIssuesFromGH(
    config.orgName,
    config.repoName,
    config.ghPAT
  );

  const fileName = `${new Date()
    .toJSON()
    .slice(0, 16)
    .replace(":", "-")}-issues`;
  await generateJsonFile(fileName, reportData);
  await generateXlsxFile(fileName, reportData);
})();
