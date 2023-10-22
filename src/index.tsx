import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import { fetchFilmsAction, checkAuthAction } from './store/api-actions';
import { fetchFavoritesAction } from './store/api-actions';
import { ToastContainer } from 'react-toastify';


store.dispatch(fetchFilmsAction());
store.dispatch(checkAuthAction());
store.dispatch(fetchFavoritesAction());


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <App />
    </Provider>
  </React.StrictMode>
);
