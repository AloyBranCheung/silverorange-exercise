import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// Components
import FetchedRepos from './components/FetchedRepos';

// I usually use CSS modules/styled-components to component-scope styling

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  // ALL repos from fetch
  const [originalRepos, setOriginalRepose] = useState([]);
  // filtered list of repos
  const [filteredRepos, setFilteredRepos] = useState([]);

  console.log(originalRepos);

  useEffect(() => {
    setIsLoading(true);
    const axiosFetch = async () => {
      // could implement proxy in package.json
      const { data } = await axios.get('http://localhost:4000/repos/');
      setOriginalRepose(data);
      setFilteredRepos(data);
    };
    axiosFetch();
    setIsLoading(false);
  }, []);

  return (
    <div className="App">
      <div className="title">
        <h1 className="">Github Repos</h1>
      </div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <FetchedRepos loading={isLoading} reposData={filteredRepos} />
        </div>
      )}
    </div>
  );
}
