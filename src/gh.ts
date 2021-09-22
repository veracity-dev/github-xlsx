
import { graphql } from "@octokit/graphql";

export const repository = async (owner: string, repo: string, graphqlWithAuth: any) => {
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

export async function load(owner:string, repo:string, pat: string) {
  try {
    const graphqlWithAuth = graphql.defaults({
      headers: {
        authorization: `bearer ${pat}`,
      },
    });

    const x = await repository(owner, repo, graphqlWithAuth);

    const rr = <response>x;
    console.log(JSON.stringify(rr));
    
    // console.log(rr.repository.issues.nodes[2].assignees); //getting assignees
    // console.log(rr.repository.issues); // printing issues
    // console.log(rr);

    return rr.repository.issues.nodes;
  } catch (error) {
    console.error(error);
    return []; 
  }
}
