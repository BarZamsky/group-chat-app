import React from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import Login from "./components/Auth/Login"
import Register from "./components/Auth/Register"
import Chat from "./components/Chat/Chat"

import history from "./history"

import './App.scss';

function App() {
  return (
      <Router basename="/login" history={history}>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/chat" component={Chat} />
        </Switch>
      </Router>
  );
}

export default App;
