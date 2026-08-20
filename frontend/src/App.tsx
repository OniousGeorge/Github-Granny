import './App.css'
import Search from './components/Search';
import Header from './components/Header';
import { useState } from 'react';
import RepoOverview from './components/RepoOverview';
import type { LanguageData } from "../../shared/types/languageType.ts";
import type { ContributorList } from "../../shared/types/Contributor.ts";
import type {Repo} from "../../shared/types/github.ts";
import type { CommitList } from '../../shared/types/commit.ts';
import type { issueList} from '../../shared/types/issues.ts';
import { useEffect } from 'react';
import LanguageCard from './components/Languages.tsx';
import StatsGrid from './components/StatsGrid.tsx';
import ShowContributor from './components/Contributor.tsx';
import Issues from './components/Issues.tsx';
import Commits from './components/Commits.tsx';



function App() {

const projectName: string = "Github Granny";
const tagline: string = "Welcome to Github Granny!";
const [Repo, setRepo] = useState<Repo | null>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [languages, setLanguages] = useState<LanguageData | null>(null);
const [contributors, setContributors] = useState<ContributorList | null>(null);
const [commits, setCommits] = useState<CommitList | null>(null);
const [issues, setIssues] = useState <issueList | null>(null);


useEffect(() => {
 console.log("Repo changed:");
}, [Repo]);

return (
   <div className="App">

    <Header
      projectName={projectName}
      tagline={tagline}
    />

    <div className="search">
      <Search
        setRepo={setRepo}
        setLoading={setLoading}
        setError={setError}
        setLanguage={setLanguages}
        setContributor={setContributors}
        setCommit={setCommits}
        setIssue={setIssues}
      />
    </div>

    {loading && <p>Loading repository...</p>}

    {error && <p>{error}</p>}

    {Repo && (
      <>
        <div className="repo-overview">
          <RepoOverview repo={Repo} />
        </div>

        <div className="stats-grid">
          <StatsGrid repo={Repo} />
        </div>
      </>
    )}

    <div className="language">
      {languages && <LanguageCard data={languages} />}
    </div>

    <div className="contributor">
      {contributors && <ShowContributor data={contributors} />}
    </div>

    <div className="commits">
      {commits && <Commits data={commits} />}
    </div>

    <div className="issues">
      {issues && <Issues data={issues} />}
    </div>

  </div>
  );
 
}

export default App;

/*return (
  <div className="App">

    <Header
      projectName={projectName}
      tagline={tagline}
    />

    <div className="search">
      <Search
        setRepo={setRepo}
        setLoading={setLoading}
        setError={setError}
        setLanguage={setLanguages}
        setContributor={setContributors}
        setCommit={setCommits}
        setIssue={setIssues}
      />
    </div>

    {loading && <p>Loading repository...</p>}

    {error && <p>{error}</p>}

    {Repo && (
      <>
        <div className="repo-overview">
          <RepoOverview repo={Repo} />
        </div>

        <div className="stats-grid">
          <StatsGrid repo={Repo} />
        </div>
      </>
    )}

    <div className="language">
      {languages && <LanguageCard data={languages} />}
    </div>

    <div className="contributor">
      {contributors && <ShowContributor data={contributors} />}
    </div>

    <div className="commits">
      {commits && <Commits data={commits} />}
    </div>

    <div className="issues">
      {issues && <Issues data={issues} />}
    </div>

  </div>
); */