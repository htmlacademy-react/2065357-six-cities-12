import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { mockComments } from './mocks/comments';
import { mockOffers } from './mocks/offer';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={mockOffers} comments={mockComments} />
    </Provider>
  </React.StrictMode>,
);
