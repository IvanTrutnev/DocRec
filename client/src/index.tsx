import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import SignUp from './pages/sign-up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';

ReactDOM.render(
  //<React.StrictMode>
  <BrowserRouter>
    <App>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/sign-up" component={SignUp} />
      </Switch>
    </App>
  </BrowserRouter>,
  //</React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
