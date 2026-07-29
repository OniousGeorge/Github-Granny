import { octokit } from "../config.js";

export const fetchUserDetails = async (username: string) => {
  try {
    const response = await octokit.rest.users.getByUsername({
    username,
  });
    return response.data;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw new Error("Failed to fetch user details");
  }
};