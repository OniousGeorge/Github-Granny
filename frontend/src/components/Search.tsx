
import type {Repo} from "../../../shared/types/github.ts";
import { useState}  from "react";
import{ getRepo} from "../services/github.ts";
import type { SubmitEventHandler } from "react";
import { getRepoLanguages } from "../services/Languages.ts";
import type { LanguageData } from "../../../shared/types/languageType.ts";
import type { ContributorList } from "../../../shared/types/Contributor.ts";
import type { CommitList} from "../../../shared/types/commit.ts";
import type { issueList} from "../../../shared/types/issues.ts"
import { getContributors } from "../services/Contributors.ts";
import { getCommits } from "../services/Commits.ts";
import { getIssues } from "../services/Issues.ts";
  
interface SearchProps {
    setRepo: (Repo: Repo) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setLanguage: (language:LanguageData | null) => void;
    setContributor: (contributor:ContributorList|null) => void;
    setCommit: (commit: CommitList | null) => void;
    setIssue: (issue: issueList | null) => void;
}


function Search({ setRepo, setLoading, setError, setLanguage, setContributor, setCommit, setIssue }: SearchProps) {

  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");


const handlesubmit: SubmitEventHandler<HTMLFormElement> = async (event) =>  {
  event.preventDefault();
  setLoading(true);
  setError(null);
  setLanguage(null);
  setContributor(null);
  setCommit(null);
  setIssue(null);
  try {
    const data = await getRepo(repoOwner, repoName);
    console.log("Form submitted");
    setRepo(data);
    const lang = await getRepoLanguages(repoOwner, repoName);
    setLanguage(lang);
    console.log("Language Locked")

    const contrib = await getContributors(repoOwner, repoName);
    setContributor(contrib);
    console.log("contributors locked in");

    const commit= await getCommits(repoOwner, repoName);
    setCommit(commit);

    const issue= await getIssues(repoOwner, repoName);
    setIssue(issue);



  } catch (error) {
    console.error("Error fetching repository data:", error);
    setError("Error fetching repository data");
  } finally {
    setLoading(false);
  }
}




return (
    <form onSubmit={handlesubmit}>
      <h2>Repo Search</h2>

      <label>Repo Owner: </label>
      <input 
      value={repoOwner}
      onChange={(event) => setRepoOwner(event.target.value)}
      type ="text" placeholder="Enter repo owner" />
      <br />
      <label>Repo Name: </label>
      <input 
      value={repoName}
      onChange={(event) => setRepoName(event.target.value)}
      type ="text" placeholder="Enter repo name" />
      <br />
      <button type="submit">Search</button>
    </form>
  );
};

export default Search;