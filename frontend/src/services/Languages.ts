
export async function getRepoLanguages(owner:string, repo:string ){
    const res = await fetch(`http://localhost:3000/repos/${owner}/${repo}/languages`);
    if (!res.ok)
    {
        throw new Error(`Failed to get lanuages: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}