import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import Login from "./components/Auth/Login"
import Chat from "./components/Chat/Chat"

import history from "./history"

import './App.scss';

function App() {
  return (
      <Router basename="/login" history={history}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
  );
}

export default App;
