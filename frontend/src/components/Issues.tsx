import type { issueList } from "../../../shared/types/issues.ts";

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
                    <small>{date}</small>
                </li>
            ))}
        </ol>
    )
}

export default Issues;