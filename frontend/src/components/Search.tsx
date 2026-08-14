
import type {Repo} from "../types/github.ts";
import { useState}  from "react";
import{ getRepo} from "../services/github.ts";
import type { SubmitEventHandler } from "react";
  
interface SearchProps {
    setRepo: (Repo: Repo) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}


function Search({ setRepo, setLoading, setError }: SearchProps) {

  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");


const handlesubmit: SubmitEventHandler<HTMLFormElement> = async (event) =>  {
  event.preventDefault();
  setLoading(true);
  setError(null);
  try {
    const data = await getRepo(repoOwner, repoName);
    console.log("Form submitted");
    setRepo(data);
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