
export async function getIssues(owner:string, repo:string ) {
    const res = await fetch(`http://localhost:3000/repos/${owner}/${repo}/issues`);
    if (!res.ok)
    {
        throw new Error(`Failed to get issues: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}