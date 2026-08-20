
export async function getContributors(owner:string, repo:string ) {
    const res = await fetch(`http://localhost:3000/repos/${owner}/${repo}/contributors`);
    if (!res.ok)
    {
        throw new Error(`Failed to get lanuages: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}