import type { LanguageData } from '../../../shared/types/languageType.ts';

export interface Snapshot {
    repo: string;
    timestamp: string;
    name: string;
    description: string | null;
    owner: { login: string };
    stars: number;
    forks: number;
    open_issues: number;
    languages: LanguageData;
}

export async function getSnapshots(repo: string): Promise<Snapshot[]> {
    const response = await fetch(
        `https://eb6w7dq53txvez2srbdwvudm5a0fmnug.lambda-url.us-east-2.on.aws/?repo=${encodeURIComponent(repo)}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch snapshots");
    }

    const data = await response.json() as unknown;
    const payload = typeof data === "object" && data !== null && "body" in data
        ? JSON.parse(String((data as { body: unknown }).body)) as unknown
        : data;

    if (!Array.isArray(payload)) {
        throw new Error("Snapshot service returned an invalid response");
    }

    return payload as Snapshot[];
}