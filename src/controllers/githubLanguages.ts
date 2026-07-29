import { octokit } from "../config.js";
import { Request, Response } from "express";
import { fetchRepoLanguages } from "../services/getRepo.js";

export const githubLanguages = async (req: Request, res: Response) => {
   try {
    type RepoParams = {
      owner: string;
      repo: string;
    };
  
    const { owner, repo } = req.params as RepoParams;
    const languagesData = await fetchRepoLanguages(owner, repo);
    
    res.json(languagesData);

  } 
 catch (error) {
    console.error("Error fetching repository details:", error);
    res.status(500).json({ error: "Failed to fetch repository details" });
  }};