export interface Repo {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    owner: {
        login: string;
    };
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;    
}