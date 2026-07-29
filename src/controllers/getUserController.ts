import {octokit} from "../config.js";
import {Request, Response} from "express";
import { fetchUserDetails } from "../services/getUser.js";

export const getUser = async (req: Request, res: Response) => {
  try {
    type UserParams = {
      username: string;
    };
    const {username} = req.params as UserParams
    const userData = await fetchUserDetails(username);
    res.json(userData);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({error: "Failed to fetch user details"});
  }};