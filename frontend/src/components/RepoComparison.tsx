import { Pie, PieChart, Tooltip } from 'recharts';
import type { LanguageData } from '../../../shared/types/languageType.ts';
import type { Repo } from '../../../shared/types/github.ts';
import type { Snapshot } from '../services/getSnapshot.ts';

interface RepoComparisonProps {
  snapshot: Snapshot;
  liveRepo: Repo;
  liveLanguages: LanguageData;
  onClose: () => void;
}

type ComparisonStat = {
  label: string;
  snapshot: number;
  live: number;
};

function formatDifference(value: number) {
  return `${value > 0 ? '+' : ''}${value}`;
}

function LanguagePieChart({ data }: { data: LanguageData }) {
  const chartData = Object.entries(data).map(([name, value], index, entries) => ({
    name,
    value,
    fill: `hsl(${(index * 360) / entries.length}, 70%, 50%)`,
  }));

  if (chartData.length === 0) {
    return <p className="comparison-empty-chart">No language data available.</p>;
  }

  return (
    <div className="comparison-language-chart">
      <PieChart width={220} height={170}>
        <Pie data={chartData} dataKey="value" nameKey="name" cx={110} cy={85} outerRadius={62} />
        <Tooltip />
      </PieChart>
      <ul className="comparison-language-legend">
        {chartData.map(({ name, value, fill }) => (
          <li key={name}>
            <span style={{ backgroundColor: fill }} />
            {name}: {value.toFixed(1)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

function RepoComparison({ snapshot, liveRepo, liveLanguages, onClose }: RepoComparisonProps) {
  const stats: ComparisonStat[] = [
    { label: 'Stars', snapshot: snapshot.stars, live: liveRepo.stargazers_count },
    { label: 'Forks', snapshot: snapshot.forks, live: liveRepo.forks_count },
    { label: 'Issues', snapshot: snapshot.open_issues, live: liveRepo.open_issues_count },
  ];

  return (
    <section className="repo-comparison" aria-labelledby="comparison-title">
      <div className="comparison-heading">
        <button className="comparison-close-button" type="button" aria-label="Close snapshot comparison" onClick={onClose}>
          x
        </button>
        <p className="comparison-kicker">Snapshot comparison</p>
        <h2 id="comparison-title">{snapshot.repo}</h2>
        <p>Live values are compared against the snapshot captured on {new Date(snapshot.timestamp).toLocaleString()}.</p>
      </div>

      <div className="comparison-columns">
        <section className="comparison-column comparison-snapshot" aria-labelledby="snapshot-title">
          <p className="comparison-label">Snapshot capture</p>
          <h3 id="snapshot-title">{snapshot.name}</h3>
          <LanguagePieChart data={snapshot.languages} />
          {stats.map((stat) => (
            <div className="comparison-stat" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.snapshot}</strong>
            </div>
          ))}
        </section>

        <section className="comparison-column comparison-live" aria-labelledby="live-title">
          <p className="comparison-label">Real-time request</p>
          <h3 id="live-title">{liveRepo.name}</h3>
          <LanguagePieChart data={liveLanguages} />
          {stats.map((stat) => (
            <div className="comparison-stat" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.live}</strong>
            </div>
          ))}
        </section>
      </div>

      <div className="comparison-differences" aria-labelledby="differences-title">
        <p className="comparison-label">Differences in stats</p>
        <h3 id="differences-title">Net Stat Changes</h3>
        <div className="difference-grid">
          {stats.map((stat) => (
            <div className="difference-stat" key={stat.label}>
              <span>{stat.label}</span>
              <strong className={stat.live - stat.snapshot < 0 ? 'difference-negative' : ''}>
                {formatDifference(stat.live - stat.snapshot)}
              </strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RepoComparison;
