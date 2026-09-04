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
import FavoriteRepos from './components/FavoriteRepos.tsx';
import RepoComparison from './components/RepoComparison.tsx';
import { getSnapshots, type Snapshot } from './services/getSnapshot.ts';
import { getRepo } from './services/github.ts';
import { getRepoLanguages } from './services/Languages.ts';

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
const [comparison, setComparison] = useState<{ snapshot: Snapshot; liveRepo: Repo; liveLanguages: LanguageData } | null>(null);
const [comparisonLoading, setComparisonLoading] = useState(false);
const [comparisonError, setComparisonError] = useState<string | null>(null);
const showingComparison = comparisonLoading || Boolean(comparison);

const handleFavoriteSelect = async (owner: string, repo: string) => {
  setComparisonLoading(true);
  setComparisonError(null);
  setComparison(null);

  try {
    const [snapshots, liveRepo, liveLanguages] = await Promise.all([
      getSnapshots(`${owner}/${repo}`),
      getRepo(owner, repo) as Promise<Repo>,
      getRepoLanguages(owner, repo),
    ]);
    const latestSnapshot = snapshots.sort(
      (first, second) => new Date(second.timestamp).getTime() - new Date(first.timestamp).getTime(),
    )[0];

    if (!latestSnapshot) {
      throw new Error('No snapshot is available for this repository.');
    }

    setComparison({ snapshot: latestSnapshot, liveRepo, liveLanguages });
  } catch (requestError) {
    setComparisonError(requestError instanceof Error ? requestError.message : 'Failed to compare repository stats.');
  } finally {
    setComparisonLoading(false);
  }
};


useEffect(() => {
 console.log("Repo changed:");
}, [Repo]);

return (
  <div className="App">
  <FavoriteRepos
    onSelect={handleFavoriteSelect}
    selectedRepo={comparison?.liveRepo.full_name ?? null}
  />
  <main className="app-content">

    <Header
      projectName={projectName}
      tagline={tagline}
    />

    {!showingComparison && (
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
    )}

    {comparisonLoading && <p className="loading-message">Loading snapshot and real-time stats...</p>}

    {comparisonError && <p className="comparison-error">{comparisonError}</p>}

    {comparison && (
      <div className="comparison-wrapper">
        <RepoComparison
          snapshot={comparison.snapshot}
          liveRepo={comparison.liveRepo}
          liveLanguages={comparison.liveLanguages}
          onClose={() => {
            setComparison(null);
            setComparisonError(null);
          }}
        />
      </div>
    )}

    {loading && <p className="loading-message">Loading repository...</p>}

    {error && <p>{error}</p>}

    {!showingComparison && Repo && (
      <>
        <div className="repo-overview">
          <RepoOverview repo={Repo} />
        </div>

        <div className="stats-grid">
          <StatsGrid repo={Repo} />
        </div>
      </>
    )}

    {!showingComparison && <div className="lists-grid">
      {contributors && contributors.length > 0 && (
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

      {commits && commits.length > 0 && (
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

      {issues && issues.length > 0 && (
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
    </div>}

    {!showingComparison && <div className="language">
      {languages && <LanguageCard data={languages} />}
    </div>}

    </main>
  </div>
  );
 
}

export default App;