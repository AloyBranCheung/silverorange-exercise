import React from 'react';
import './FetchedRepos.css';
import { useNavigate } from 'react-router-dom';

export default function FetchedRepos({ reposData, loading }: any) {
  const navigate = useNavigate();

  const clickHandler = (id: any) => {
    const selectedRepo = reposData.filter((repo: any) => {
      return repo.id === id;
    });
    navigate(`/${id}`, { state: selectedRepo });
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
      </div>
    );
  });

  return (
    <div className="repoContainer">
      {loading ? <h1>Loading...</h1> : <>{mappedRepos}</>}
    </div>
  );
}
