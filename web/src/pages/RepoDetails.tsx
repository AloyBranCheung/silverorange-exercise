import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RepoDetails() {
  const navigate = useNavigate();
  const location: any = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [readMe, setReadMe] = useState('');
  const [isReadMeError, setIsReadMeError] = useState(false);
  const [readMeError, setReadMeError] = useState('');
  const [recentCommits, setRecentCommits] = useState<any>({});

  // can render Readme with octokit https://docs.github.com/en/rest/markdown#render-a-markdown-document

  useEffect(() => {
    // fetch
    setIsLoading(true);
    const fetchReadMe = async () => {
      try {
        const response = await axios.get(
          `https://raw.githubusercontent.com/silverorange/${location.state[0].name}/master/README.md`
        );
        setReadMe(response.data);
      } catch (error: any) {
        console.log(error);
        setIsReadMeError(true);
        setReadMeError(error.message);
      }
    };

    const fetchCommits = async () => {
      let commitSha = '';
      try {
        const response = await axios.get(
          `https://api.github.com/repos/silverorange/${location.state[0].name}/branches`
        );
        commitSha = response.data[0].commit.sha;

        const commits = await axios.get(
          `https://api.github.com/repos/silverorange/${location.state[0].name}/commits/${commitSha}`
        );
        // received data
        setRecentCommits(commits.data.commit);
      } catch (error) {
        console.log(error);
      }
    };
    fetchReadMe();
    fetchCommits();
    setIsLoading(false);
  }, [location.state]);

  console.log(recentCommits);

  const clickBack = () => {
    navigate(-1);
  };
  return (
    <div>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <button onClick={clickBack}>Back</button>
          <h1>Repo Details: {location.state[0].name}</h1>
          <p>Recent Commit Date: {recentCommits.author.date}</p>
          <p>Author: {recentCommits.author.name} </p>
          <p>Message: {recentCommits.message} </p>
          <div>
            <h1>ReadMe:</h1>
            {isReadMeError ? (
              <>
                <h3>{readMeError}</h3>
                <h3>File doesn't exist.</h3>
              </>
            ) : (
              <p>{readMe}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
