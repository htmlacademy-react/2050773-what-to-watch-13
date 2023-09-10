import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FILMCARDS_COUNT } from './const';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App filmscardsCount={FILMCARDS_COUNT} />
  </React.StrictMode>
);
