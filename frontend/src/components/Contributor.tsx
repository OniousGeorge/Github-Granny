
import type { ContributorList } from "../../../shared/types/Contributor.ts";
interface conProps
{
    data:ContributorList;
}

function ShowContributor({data}:conProps)
{
   
    return (
    
 <ol>
            {data.map((commit, data) => (
    <li key={data}>
        <span>{commit.name}</span>
        <small>{commit.comms}</small>
    </li>
))}
        </ol>
    )
}

export default ShowContributor;