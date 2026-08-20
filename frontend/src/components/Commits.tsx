import type { CommitList } from "../../../shared/types/commit";

interface commitsProps
{
    data:CommitList;
}

export function Commits({data}:commitsProps)
{
    return (
 <ol>
            {data.map(({ name, date }) => (
                <li key={name}>
                    <mark>{name}</mark>
                    <small>{date}</small>
                </li>
            ))}
        </ol>
    )
}

export default Commits;