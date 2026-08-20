import { getIssues } from "../controllers/getIssuesController";
import { githubLanguages } from "../controllers/githubLanguages";
import {getRepoDetails} from "../controllers/GithubRepoController";
import { getCommits } from "../controllers/getCommitsController";
import { getContributors } from "../controllers/getContributorsController";
import express from "express";

export const githubRepoRouter = express.Router();
export const githubLanguagesRouter = express.Router();
export const githubIssuesRouter = express.Router();

githubRepoRouter.get("/TEST-ROUTE", (req, res) => {
    console.log("TEST ROUTE HIT");
    res.json({ test: "SUCCESS" });
});

githubRepoRouter.get("/:owner/:repo", getRepoDetails);

githubRepoRouter.get("/:owner/:repo/issues", getIssues);

githubRepoRouter.get("/:owner/:repo/languages", githubLanguages);

githubRepoRouter.get("/:owner/:repo/commits", getCommits);

githubRepoRouter.get("/:owner/:repo/contributors", getContributors);