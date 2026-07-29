import { getUser } from "../controllers/getUserController";
import express from "express"; 

export const githubUserRouter = express.Router();

githubUserRouter.get("/username", getUser);