import { Octokit } from "octokit";
import {SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const secretsClient = new SecretsManagerClient({
  region: "us-east-2"
});

async function getGithubToken(): Promise<string> {
  const secretArn = process.env.GITHUB_SECRET_ARN;
    console.log("Secret ARN configured");
  if (!secretArn) {
    throw new Error("GITHUB_SECRET_ARN is not configured");
  }

  const response = await secretsClient.send(
    new GetSecretValueCommand({
      SecretId: secretArn
    })
  );

  if (!response.SecretString) {
    throw new Error("GitHub PAT secret is empty");
  }

  const secret = JSON.parse(response.SecretString);

  if (!secret.PAT) {
  throw new Error("PAT field not found in GitHub secret");
}

  return secret.PAT;
}

export async function getOctokit(): Promise<Octokit> {
 const token = await getGithubToken();

 const octokit = new Octokit({ 
  auth: token
});
 
return octokit;
}
