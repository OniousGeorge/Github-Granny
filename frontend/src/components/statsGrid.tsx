import StatsCard from './StatsCard';
import type {Repo} from "../../../shared/types/github.ts";

interface statsProps{
    repo:Repo | null
}

function StatsGrid({repo}:statsProps)
{
    
    return ( <> 
    
    {repo && (
  <div>
    <StatsCard title='Stars' value={repo.stargazers_count} />

    <StatsCard title='Forks' value={repo.forks_count} />

    <StatsCard title='Issues' value={repo.open_issues_count} />

    
  </div>
)}


</>
);

  
}

export default StatsGrid;