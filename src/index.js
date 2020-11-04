import React from 'react';
import ReactDOM from 'react-dom';

import {store, persistor} from './redux/store';
import { Provider } from 'react-redux';

import {BrowserRouter} from 'react-router-dom';

import App from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <React.StrictMode>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
