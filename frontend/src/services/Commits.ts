
export async function getCommits(owner:string, repo:string ) {
    const res = await fetch(`http://localhost:3000/repos/${owner}/${repo}/commits`);
    if (!res.ok)
    {
        throw new Error(`Failed to get commits: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}