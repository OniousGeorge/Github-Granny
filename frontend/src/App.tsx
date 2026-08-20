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

type ExpandedList = 'contributors' | 'commits' | 'issues' | null;


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
const [expandedList, setExpandedList] = useState<ExpandedList>(null);


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

    {loading && <p className="loading-message">Loading repository...</p>}

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

    <div className="lists-grid">
      {contributors && (
        <div className={`contributor list-panel ${expandedList === 'contributors' ? 'list-expanded' : ''}`}>
          <button
            className="list-expand-button"
            type="button"
            aria-label={expandedList === 'contributors' ? 'Minimize contributors' : 'Expand contributors'}
            aria-expanded={expandedList === 'contributors'}
            onClick={() => setExpandedList(expandedList === 'contributors' ? null : 'contributors')}
          >
            {expandedList === 'contributors' ? '-' : '+'}
          </button>
          <ShowContributor data={contributors} />
        </div>
      )}

      {commits && (
        <div className={`commits list-panel ${expandedList === 'commits' ? 'list-expanded' : ''}`}>
          <button
            className="list-expand-button"
            type="button"
            aria-label={expandedList === 'commits' ? 'Minimize commits' : 'Expand commits'}
            aria-expanded={expandedList === 'commits'}
            onClick={() => setExpandedList(expandedList === 'commits' ? null : 'commits')}
          >
            {expandedList === 'commits' ? '-' : '+'}
          </button>
          <Commits data={commits} />
        </div>
      )}

      {issues && (
        <div className={`issues list-panel ${expandedList === 'issues' ? 'list-expanded' : ''}`}>
          <button
            className="list-expand-button"
            type="button"
            aria-label={expandedList === 'issues' ? 'Minimize issues' : 'Expand issues'}
            aria-expanded={expandedList === 'issues'}
            onClick={() => setExpandedList(expandedList === 'issues' ? null : 'issues')}
          >
            {expandedList === 'issues' ? '-' : '+'}
          </button>
          <Issues data={issues} />
        </div>
      )}
    </div>

    <div className="language">
      {languages && <LanguageCard data={languages} />}
    </div>

  </div>
  );
 
}

export default App;