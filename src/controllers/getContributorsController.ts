import { octokit } from "../config.js";
import { Request, Response } from "express";
import { fetchRepoContributors } from "../services/getRepo.js";

export const getContributors = async (req: Request, res: Response) => {
  try {
    type RepoParams = {
      owner: string;
      repo: string;
    };
    const { owner, repo } = req.params as RepoParams;
    const contributorData = await fetchRepoContributors(owner, repo);
    res.json(contributorData);
  } catch (error) {
    console.error("Error fetching contributors:", error);
    res.status(500).json({ error: "Failed to fetch contributors" });
  }};