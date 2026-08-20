import {octokit} from "../config.js";
import { ContributorData, ContributorList } from "../../shared/types/Contributor.js";
import { Repo } from "../../shared/types/github.js";
import { LanguageData } from "../../shared/types/languageType.js";
import { LangPercentage } from "../utils.js";
import { issueData, issueList } from "../../shared/types/issues.js";
import { CommitData, CommitList } from "../../shared/types/commit.js";
import { open } from "node:fs";

export const fetchRepo = async (owner: string, repo: string): Promise<Repo> => {
  try {
    const response = await octokit.rest.repos.get({
      owner,
      repo
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository details:", error);
    throw error;
  }
};


export const fetchRepoLanguages = async (owner: string, repo: string): Promise<LanguageData> => {
  try {
    const response = await octokit.rest.repos.listLanguages({   
      owner,
      repo
    });

    const langData=response.data;
    const res=LangPercentage(langData);
    
    return res;
  } catch (error) {
    console.error("Error fetching repository languages:", error);
    throw error;
  }
};

export const fetchRepoContributors = async (owner: string, repo: string): Promise<ContributorList> => {
  try {
    const response = await octokit.rest.repos.listContributors({ 
      owner,
      repo
    });
    const conData=response.data.map((contributor) =>
    ({
        name: contributor.login ?? "No Name",
        comms: contributor.contributions
    }));

    return conData.slice(0,5);
  } catch (error) {
    console.error("Error fetching repository contributors:", error);
    throw error;
  }
};

export const fetchRepoCommits = async (owner: string, repo: string): Promise<CommitList> => {
  try {
    const response = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 5,
    });

    const commitData: CommitList = response.data.map((commit) => ({
    date: commit.commit.author?.date ?? null,
    name: commit.commit.author?.name ?? null
  }));

    return commitData;
  } catch (error) {
    console.error("Error fetching repository commits:", error);
    throw error;
  }
}; 


export const fetchRepoIssues = async (owner: string, repo: string): Promise<issueList> => {
  try {

const response = await octokit.request('GET /repos/{owner}/{repo}/issues',{
    owner,
    repo,
    per_page: 5,
    page: 1,
    state: "open",
});

const issueData = response.data.map((issue) => ({
    date: issue.created_at,
    title: issue.title
}));
return issueData;

  } catch (error) {
    console.error("Error fetching repository issues:", error);
    throw error;
  }
};
