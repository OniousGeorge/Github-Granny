
export async function getRepo(owner: string, repo: string) {
    const res = await fetch(`http://localhost:3000/repos/${owner}/${repo}`)
    if (!res.ok) {
        throw new Error(`Failed to fetch repository: ${res.statusText}`);
    }
    const data = await res.json();
    
    
    return data;
}