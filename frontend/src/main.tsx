import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Home from './pages/Home';
import StoryDetail from './pages/StoryDetail';
import Reader from './pages/Reader';
import { ErrorBoundary } from './ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/story/:slug" element={<StoryDetail />} />
          </Route>
          {/* Reader is outside of AppLayout to have full control over the shell */}
          <Route path="/story/:slug/read" element={<Reader />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
);
