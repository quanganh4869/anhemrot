import React from 'react';
import ReactDOM from 'react-dom/client';
import StoryApp from './StoryApp';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <StoryApp />
  </React.StrictMode>
);
