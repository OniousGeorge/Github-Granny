import { useState } from 'react';

const favoriteRepos = [
  { label: 'Kubernetes', owner: 'Kubernetes', repo: 'Kubernetes' },
  { label: 'DeepSeek-Harness', owner: 'deepseek-ai', repo: 'deepseek-harness' },
  { label: 'Langchain', owner: 'langchain-ai', repo: 'langchain' },
  { label: 'Linux', owner: 'torvalds', repo: 'linux' },
  { label: 'Ponytail', owner: 'DietrichGebert', repo: 'ponytail' },
];

interface FavoriteReposProps {
  onSelect: (owner: string, repo: string) => void;
  selectedRepo: string | null;
}

function FavoriteRepos({ onSelect, selectedRepo }: FavoriteReposProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`favorite-repos ${isCollapsed ? 'favorite-repos-collapsed' : ''}`} aria-labelledby="favorite-repos-title">
      <button
        className="favorite-repos-toggle"
        type="button"
        aria-label={isCollapsed ? 'Expand favorite repositories' : 'Collapse favorite repositories'}
        aria-expanded={!isCollapsed}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? '>' : '<'}
      </button>
      <div className="favorite-repos-panel">
        <p className="favorite-repos-kicker">Pinned collection</p>
        <h2 id="favorite-repos-title">My Favorite Repos to Keep Track Of</h2>
      </div>
      <nav aria-label="Favorite repositories">
        <ul>
          {favoriteRepos.map((repo) => (
            <li key={repo.label}>
              <button
                type="button"
                className={selectedRepo === `${repo.owner}/${repo.repo}` ? 'favorite-repo-selected' : ''}
                onClick={() => onSelect(repo.owner, repo.repo)}
              >
                {repo.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default FavoriteRepos;
