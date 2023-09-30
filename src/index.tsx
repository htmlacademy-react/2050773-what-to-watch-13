import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { GENRES } from './const';
import ErrorMessage from './components/error-message/error-message';
import { fetchFilmsAction, checkAuthAction } from './store/api-actions';


store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App
        genres={GENRES}
      />
    </Provider>
  </React.StrictMode>
);
