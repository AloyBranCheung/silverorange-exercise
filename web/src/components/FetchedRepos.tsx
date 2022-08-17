import React, { useState } from 'react';
import './FetchedRepos.css';

export default function FetchedRepos({ reposData, loading }: any) {
  const [repoID, setRepoId] = useState(0);

  const clickHandler = (id: any) => {
    setRepoId(id);
  };

  // map filtered list of repos
  const mappedRepos = reposData.map((repo: any) => {
    return (
      <div
        onClick={() => {
          clickHandler(repo.id);
        }}
        className="repo"
        key={repo.id}
      >
        <h1>
          <strong>Title:</strong> {repo.name}
        </h1>
        <p>
          <strong>Description:</strong>
          {repo.description === null
            ? ' No description'
            : ` ${repo.description}`}
        </p>
        <p>
          <strong>Language Used:</strong> {repo.language}
        </p>
        <p>
          <strong>Number of Forks:</strong> {repo.forks}
        </p>
        {repoID === repo.id && (
          <>
            <p>
              <strong>Recent Commit Date: </strong>
            </p>
            <p>
              <strong>Author: </strong>
            </p>
            <p>
              <strong>Message: </strong>
            </p>
          </>
        )}
      </div>
    );
  });

  return (
    <div className="repoContainer">
      {loading ? <h1>Loading...</h1> : <>{mappedRepos}</>}
    </div>
  );
}
