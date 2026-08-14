import './App.css'
import Search from './components/Search';
import Header from './components/Header';
import { useState } from 'react';
import RepoOverview from './components/RepoOverview';
import type { Repo } from './types/github.ts';
import { useEffect } from 'react';
import StatsCard from './components/statsCard.tsx';


function App() {

const projectName: string = "Github Granny";
const tagline: string = "Welcome to Github Granny!";
  const [Repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
 console.log("Repo changed:");
}, [Repo]);

return (
   <>
   <Header projectName={projectName} tagline={tagline} />

   <Search 
   setRepo={setRepo}
   setLoading={setLoading}
   setError={setError}
   />

  {loading && <p>Loading repository...</p>}
  {error && <p>{error}</p>}
{Repo && <RepoOverview repo={Repo} />} 



</>
  );
 
}

export default App;
