import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// Components
import FetchedRepos from './components/FetchedRepos';

// I usually use CSS modules/styled-components to component-scope styling

export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMesssage, setErrorMessage] = useState('');
  // ALL repos from fetch
  const [originalRepos, setOriginalRepose] = useState([]);
  // filtered list of repos
  const [filteredRepos, setFilteredRepos] = useState([]);

  // fetch repos to react app
  useEffect(() => {
    setIsLoading(true);
    const axiosFetch = async () => {
      // could implement proxy in package.json
      try {
        const { data } = await axios.get('http://localhost:4000/repos/');
        setOriginalRepose(data);
        setFilteredRepos(data);
      } catch (error: any) {
        console.log('Sabotaged by terrible middleware?');
        console.log(error);
        setErrorMessage(error.message);
        setIsError(true);
      }
    };
    axiosFetch();
    setIsLoading(false);
  }, []);

  if (isError) {
    return (
      <div className="error">
        <h1>
          You were sabotaged by terrible middleware, contact the devs to fix
          this.
        </h1>
        <p>
          Try refreshing the page, there's only a 25% chance it'll fail again.
        </p>
        <p>Erorr Message: {errorMesssage}</p>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="title">
        <h1 className="">Github Repos</h1>
      </div>
      {isLoading || originalRepos.length === 0 ? (
        <h1 style={{ display: 'flex', height: '100vh' }}>Loading...</h1>
      ) : (
        <div>
          <FetchedRepos loading={isLoading} reposData={filteredRepos} />
        </div>
      )}
    </div>
  );
}
