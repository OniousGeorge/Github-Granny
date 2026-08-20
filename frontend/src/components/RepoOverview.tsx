
import type { Repo } from '../../../shared/types/github.ts';

interface RepoOverviewProps {
    repo: Repo | null; }



 function RepoOverview({ repo }: RepoOverviewProps) {

    if (!repo) {return null;}

return (
    
    <div>
        <h2>{repo.name}</h2>
        
        <p>Description: {repo.description}</p>

        <p>Created by: {repo.owner.login}</p>
</div>
);
}



export default RepoOverview;