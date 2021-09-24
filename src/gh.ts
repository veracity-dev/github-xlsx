
import { graphql } from "@octokit/graphql";

export const repository = async (owner: string, repo: string, graphqlWithAuth: any) => {
  return await graphqlWithAuth(`
  {
    repository(owner: "${owner}", name: "${repo}") {
      issues(last: 100) {
        nodes {
          number,
          title,
          url,
          createdAt,
          lastEditedAt,          
          labels(first:10){
            nodes{
              name
            }
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
  avatarUrl: string,
  name: string,
  url: string

}
type assigneeNode = {
  node: assignees[]
}
type node = {
  title: string,
  body: string,
  url: string,
  assignees: assigneeNode
}

type issues = {
  nodes: node[]
}

type repository = {
  issues: issues
}

export type response = {
  repository: repository
}

export async function getIssuesFromGH(owner: string, repo: string, pat: string) {
  try {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `bearer ${pat}`,
      },
    });

    const x = await repository(owner, repo, graphqlWithAuth);

    const rr = <response>x;
    // console.log(JSON.stringify(rr));

    // console.log(rr.repository.issues.nodes[2].assignees); //getting assignees
    // console.log(rr.repository.issues); // printing issues
    // console.log(rr);

    return preparedData(rr.repository.issues.nodes);
  } catch (error) {
    console.error(error);
    return [];
  }
}


function preparedData(data: any): any {
  // TODO: Make labels a comma seprated list
  // TODO: Make assignees a comma seprated list
  // TODO: Make the tile a link (using the URL field)

  return data;
}