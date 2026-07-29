import { octokit } from "../config.js";
import { Request, Response } from "express";
import { fetchRepo } from "../services/getRepo.js";
  



export const getRepoDetails = async (req: Request, res: Response) => {
  
    try {
  
    type RepoParams = {
      owner: string;
      repo: string;
    };

    const { owner, repo } = req.params as RepoParams;
    
    const repoData = await fetchRepo(owner, repo);
    
    res.json(repoData);

  } 
 catch (error) {
    console.error("Error fetching repository details:", error);
    res.status(500).json({ error: "Failed to fetch repository details" });
  }};