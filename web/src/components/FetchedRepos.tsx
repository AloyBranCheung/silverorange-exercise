import React from 'react';
import './FetchedRepos.css';

export default function FetchedRepos({ reposData, loading }: any) {
  const mappedRepos = reposData.map((repo: any) => {
    return (
      <div className="repo" key={repo.id}>
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
      </div>
    );
  });

  return (
    <div className="repoContainer">
      {loading ? <h1>Loading...</h1> : <>{mappedRepos}</>}
    </div>
  );
}
