import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Components

import RepoDetails from './pages/RepoDetails';
import MainPage from './pages/MainPage';

// Note: I did not use typescript and just bypassed typing with 'any',
// I usually use CSS modules/styled-components to component-scope styling

export function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/:repoId" element={<RepoDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
