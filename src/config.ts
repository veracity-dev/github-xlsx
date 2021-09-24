export interface Config {
    orgName: string;
    repoName: string;
    ghPAT: string;
}

export function getConfig(): Config {
    const ghPAT = process.env.GH_PAT;
    if (!ghPAT) {
        throw Error("GH_PAT enviornment variable is required. Set it to GitHub Persosnal Access Token");
    }

    if (process.argv.length < 3) {
        throw Error("The GH repositoy should be specified as a command line argument");
    }

    const REPO = process.argv[2];

    const [ownerName, repoName] = REPO.split('/');
    if (!repoName) {
        throw Error("The GH repositoy should be specified in org-name/repo-name format. Example: veracity-dev/github-xlsx");
    }

    return { orgName: ownerName, repoName, ghPAT };
}
