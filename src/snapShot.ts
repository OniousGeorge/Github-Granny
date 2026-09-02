import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { fetchRepo, fetchRepoCommits, fetchRepoContributors, fetchRepoLanguages } from "./services/getRepo";
const client = new DynamoDBClient({
  region: "us-east-2"
});

const dynamodb = DynamoDBDocumentClient.from(client);

export async function saveSnapshot(snapshot: object) {
  await dynamodb.send(
    new PutCommand({
      TableName: process.env.TABLE_NAME,
      Item: snapshot
    })
  );
}

export async function createSnapShot(owner:string, repo:string) {
    const repoDB = await fetchRepo(owner,repo);
    const repoDB_Languages= await fetchRepoLanguages(owner,repo);

    const timeStamp= new Date().toISOString();

    const snapshot = 
    {
        repo: "${owner}/${repo}",
        timestamp:timeStamp,
        name: repoDB.name,
        description: repoDB.description,
        owner: repoDB.owner,
        stars: repoDB.stargazers_count,
        forks: repoDB.forks_count,
        open_issues: repoDB.open_issues_count,
        languages: repoDB_Languages,
    }

    await saveSnapshot(snapshot);

    return snapshot;
}

const historical_repos= 
[
    {owner:"Kubernetes", repo:"Kubernetes"},
    {owner:"deepseek-ai", repo:"deepseek-harness"},
    {owner:"langchain-ai", repo:"langchain"},
    {owner:"torvalds", repo:"linux"},
    {owner:"DietrichGebert", repo:"ponytail"},
    
]

export const snapshotHandler = async () => {
for (const hisrepo of historical_repos)
{
    await createSnapShot(hisrepo.owner, hisrepo.repo)
}

return {StatusCode: 200, body: "created"};
};
