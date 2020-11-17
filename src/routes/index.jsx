import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthRoute from "./authRoute";
import { AuthProvider } from "../modules/context"
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Lost from '../pages/lost'
import Found from '../pages/found'

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Login} />
          <Route path={"/login"} component={Login} />

          <AuthRoute path={"/dashboard"} component={Dashboard} />
          <AuthRoute path={"/lost"} component={Lost} />
          <AuthRoute path={"/found"} component={Found} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
