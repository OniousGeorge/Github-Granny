
export async function getCommits(owner:string, repo:string ) {
    const res = await fetch(`https://qcwimopsl3feqk6fqddvm7nz7i0xejkf.lambda-url.us-east-2.on.aws/repos/${owner}/${repo}/commits`);
    if (!res.ok)
    {
        throw new Error(`Failed to get commits: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
}