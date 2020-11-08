import React from "react";
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Lost from '../pages/lost'
import Found from '../pages/found'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
      <Route exact path={"/dashboard"} component={Dashboard} />
          <Route path={"/login"} component={Login} />
          <Route path={"/lost"} component={Lost} />
          <Route path={"/found"} component={Found} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
