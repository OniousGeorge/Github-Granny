import { octokit } from "../config.js";
import { Request, Response } from "express";
import { fetchRepoPulls } from "../services/getRepo.js";

export const getPulls = async (req: Request, res: Response) => {
  try {
    type RepoParams = {
      owner: string;
      repo: string;
    };
    const { owner, repo } = req.params as RepoParams;
    const pullsData = await fetchRepoPulls(owner, repo);
    res.json(pullsData);
  } catch (error) {
    console.error("Error fetching pulls:", error);
    res.status(500).json({ error: "Failed to fetch pulls" });
  }};