
export async function getRepo(owner: string, repo: string) {
    const res = await fetch(`https://qcwimopsl3feqk6fqddvm7nz7i0xejkf.lambda-url.us-east-2.on.aws/repos/${owner}/${repo}`)
    if (!res.ok) {
        throw new Error(`Failed to fetch repository: ${res.statusText}`);
    }
    const data = await res.json();
    
    
    return data;
}