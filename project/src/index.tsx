import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { mockComments } from './mocks/comments';
import { mockOffers } from './mocks/offer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offers={mockOffers}
      comments={mockComments}
    />
  </React.StrictMode>,
);
