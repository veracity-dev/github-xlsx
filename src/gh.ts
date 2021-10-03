
import { graphql } from "@octokit/graphql";

export const repository = async (owner: string, repo: string, graphqlWithAuth: any) => {
  return await graphqlWithAuth(`
  {
    repository(owner: "${owner}", name: "${repo}") {
      issues(last: 100) {
        nodes {
          number,
          title,
          state,
          url,
          createdAt,
          lastEditedAt, 
          author{
            login
           }         
          labels(first:10){
            nodes{
              id
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

  return data.map((y: any) => mapIssue(y)) 
}

const mapIssue = function(json: any) : any{
  const out: row = {
    number : json['number'],
    title: json['title'],
    state: json ['state'],
    author: json['author']['login'],
    body: json ['body'],
    url: json ['url'],
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
  url: string,
  createdAt: string,
  lastEditedAt: string,
  //milestone: string,
  label: string,
  assignee: string
}