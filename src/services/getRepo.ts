import {octokit} from "../config.js";

export const fetchRepo = async (owner: string, repo: string) => {
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

export const fetchRepoLanguages = async (owner: string, repo: string) => {
  try {
    const response = await octokit.rest.repos.listLanguages({   
      owner,
      repo
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository languages:", error);
    throw error;
  }
};

export const fetchRepoContributors = async (owner: string, repo: string) => {
  try {
    const response = await octokit.rest.repos.listContributors({ 
      owner,
      repo
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository contributors:", error);
    throw error;
  }
};

export const fetchRepoCommits = async (owner: string, repo: string) => {
  try {
    const response = await octokit.rest.repos.listCommits({
      owner,
      repo
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository commits:", error);
    throw error;
  }
}; 

export const fetchRepoPulls = async (owner: string, repo: string) => {
  try {
    const response = await octokit.rest.pulls.list({
      owner,
      repo
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository pulls:", error);
    throw error;
  }
};

export const fetchRepoIssues = async (owner: string, repo: string) => {
  try {
    const response = await octokit.rest.issues.listForRepo({
      owner,
      repo
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching repository issues:", error);
    throw error;
  }
};
