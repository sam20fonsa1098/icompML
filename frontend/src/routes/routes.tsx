import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import User from '../containers/user/user';
import User from '../containers/user';
import DefaultPage from '../containers/default/defaultPage';

const Routes = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/users">
            <User/>
          </Route>
          <Route path="/teachers">
          <h1>No teachers yet</h1>
          </Route>
          <Route path="/">
            <DefaultPage/>
          </Route>
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;
