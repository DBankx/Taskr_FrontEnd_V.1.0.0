import React from 'react';
import ReactDOM from 'react-dom';
import App from './application/appLayout/app/App';
import reportWebVitals from './reportWebVitals';
import "./assets/sass/index.scss";
import {Router, Route} from "react-router-dom";
import {createBrowserHistory} from "history";
import { QueryParamProvider } from 'use-query-params';

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
      <Router history={history}>
          <QueryParamProvider ReactRouterRoute={Route}>
    <App />
          </QueryParamProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
