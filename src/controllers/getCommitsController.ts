import { octokit } from "../config.js";
import { Request, Response } from "express";
import { fetchRepoCommits } from "../services/getRepo.js";

export const getCommits = async (req: Request, res: Response) => {
  try {
    type RepoParams = {
      owner: string;
      repo: string;
    };
    const { owner, repo } = req.params as RepoParams;
    const commitData = await fetchRepoCommits(owner, repo);
    res.json(commitData);
  } catch (error) {
    console.error("Error fetching commits:", error);
    res.status(500).json({ error: "Failed to fetch commits" });
  }};