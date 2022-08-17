import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RepoDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // fetch
  }, []);

  const clickBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <h1>Repo Details: {location.state[0].name}</h1>
      <p>Recent Commit Date: </p>
      <p>Author: </p>
      <p>Message: </p>
      <div>Markdown</div>
      <button onClick={clickBack}>Back</button>
    </div>
  );
}
