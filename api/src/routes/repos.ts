import { Router, Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  // repository.fork = false repos to send to client
  const filteredRepos: any = [];

  // Task #2, #3
  // Source 1: Axios GET for https://api.github.com/users/silverorange/repos
  try {
    const response = await axios.get(
      'https://api.github.com/users/silverorange/repos'
    );

    for (const repo of response.data) {
      if (!repo.fork) {
        filteredRepos.push(repo);
      }
    }
  } catch (error) {
    // or next() to an error handling middleware? or I could throw an error?
    console.error(error);
  }

  // Source 2: File system api/data/repos.json, since it can be changed while
  // service is running
  // admin changes file and a request happens after by a consumer? duplicates?
  const data = fs.readFileSync(
    path.resolve(__dirname, '../../data/repos.json')
  );
  const parsedData = JSON.parse(data.toString());
  for (const repo of parsedData) {
    if (!repo.fork) {
      filteredRepos.push(repo);
    }
  }

  // response
  res.header('Cache-Control', 'no-store');
  // Task #4
  res.header('Content-Type', 'application/json');
  res.status(200);
  // TODO: See README.md Task (A). Return repo data here. You’ve got this! Eeek!
  // Task #4
  res.json(filteredRepos);
});
