import type { Repo } from '../types/github.ts';

export async function getRepo(owner: string, repo: string): Promise<Repo> {
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`)
    if (!res.ok) {
        throw new Error(`Failed to fetch repository: ${res.statusText}`);
    }
    const data = await res.json();
    console.log(data);
    
    return data;
}