import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AuthRoute from "./authRoute";
import { AuthProvider } from "../modules/context";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Lost from "../pages/lost";
import Found from "../pages/found";
import Claim from "../pages/claim";
import Claimed from "../pages/claimed";
import Donated from "../pages/donated";
import Admins from "../pages/admins";
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
          <AuthRoute path={"/claim"} component={Claim} />
          <AuthRoute path={"/claimed"} component={Claimed} />
          <AuthRoute path={"/donated"} component={Donated} />
          <AuthRoute path={"/admins"} component={Admins} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Router;
