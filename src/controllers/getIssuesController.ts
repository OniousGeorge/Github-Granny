import { octokit } from "../config.js";
import { Request, Response } from "express";
import { fetchRepoIssues } from "../services/getRepo.js";

export const getIssues = async (req: Request, res: Response) => {
  try {
    type RepoParams = {
      owner: string;
      repo: string;
    };
    const { owner, repo } = req.params as RepoParams;
    const issueData = await fetchRepoIssues(owner, repo);
    res.json(issueData);
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }};