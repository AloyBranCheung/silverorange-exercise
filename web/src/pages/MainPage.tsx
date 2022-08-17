import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import FetchedRepos from '../components/FetchedRepos';
import LanguagesButtons from '../components/LanguagesButtons';

export default function MainPage() {
  // Loading/Error Handling
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMesssage, setErrorMessage] = useState('');

  // ALL repos from fetch
  const [originalRepos, setOriginalRepose] = useState<any>([]);
  // filtered list of repos
  const [filteredRepos, setFilteredRepos] = useState([]);

  // list of language types
  const [listOfLanguages, setListofLanguages] = useState([]);

  // fetch repos to react app
  useEffect(() => {
    setIsLoading(true);
    const axiosFetch = async () => {
      // could implement proxy in package.json
      try {
        const { data } = await axios.get('http://localhost:4000/repos/');

        // sort reverse chronlogical order
        const sortedRepos = data
          .sort((a: any, b: any) => {
            return (
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime()
            );
          })
          .reverse();

        // get a list of languages
        const languages: any = [];

        for (const repo of data) {
          if (!languages.includes(repo.language)) {
            languages.push(repo.language);
          }
        }

        setListofLanguages(languages);
        setOriginalRepose(sortedRepos);
        setFilteredRepos(sortedRepos);
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

  // if terrible middleware happens then will return a failed response and prompt to refresh page
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

  // filter language chosen
  const languageChosen = (language: any) => {
    const newArr = originalRepos.filter((repo: any) => {
      return repo.language === language;
    });

    setFilteredRepos(newArr);
  };
  return (
    <div>
      <div className="title">
        <h1 className="">Github Repos</h1>
      </div>
      {isLoading || originalRepos.length === 0 ? (
        <h1 style={{ display: 'flex', height: '100vh' }}>Loading...</h1>
      ) : (
        <div>
          <LanguagesButtons
            languageChosen={languageChosen}
            languages={listOfLanguages}
          />
          <FetchedRepos loading={isLoading} reposData={filteredRepos} />
        </div>
      )}
    </div>
  );
}
