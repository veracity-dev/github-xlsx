import { graphql } from "@octokit/graphql";

export const repository = async (
  owner: string,
  repo: string,
  graphqlWithAuth: any
) => {
  return await graphqlWithAuth(`
  {
    repository(owner: "${owner}", name: "${repo}") {
      issues(last: 100) {
        nodes {
          number,
          state,
          assignees(first:1){
            nodes{
              name
            }
          }
          title,
          updatedAt,
          createdAt,
          labels(last:10){
            nodes{
              description
            }
          }
          body,
          url,
          author{
            login
          }          
        }
      }
    }
  }
`);
};

type assignees = {
  avatarUrl: string;
  name: string;
  url: string;
};
type assigneeNode = {
  node: assignees[];
};
type node = {
  title: string;
  body: string;
  url: string;
  description: string;
  updatedAt: string;
  assignees: assigneeNode;
};

type issues = {
  nodes: node[];
};

type repository = {
  issues: issues;
};

export type response = {
  repository: repository;
};

export async function getIssuesFromGH(
  owner: string,
  repo: string,
  pat: string
) {
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
  return data.map((y: any) => mapIssue(y));
}

const mapIssue = function (json: any): GithubIssue {


  const out: row = {
    number: json["number"],
    state: json["state"],
    assignee: json["assignees"]["nodes"].map((x: any) => x["name"]).join(", "),
    title: json["title"],
    updatedAt: json["updatedAt"],
    createdAt: json["createdAt"],
    labels: json["labels"]["nodes"]
      .map((x: any) => x["description"])
      .join(", "),
    author: json["author"]["login"],
    body: json["body"],
    url: json["url"],
  };

  return out;
};

type row = {
  number: number;
  title: string;
  state: string;
  author: string;
  body: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  labels: string;
  assignee: string;
};
