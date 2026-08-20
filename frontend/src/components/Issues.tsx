import type { issueList } from "../../../shared/types/issues.ts";
import { formatDate } from "../utils";

interface issueProps
{
    data:issueList;
}

export function Issues({data}:issueProps)
{
    return (
 <ol>
            {data.map(({ title, date }) => (
                <li key={title}>
                    <mark>{title}</mark>
                    <small>{formatDate(date)}</small>
                </li>
            ))}
        </ol>
    )
}

export default Issues;