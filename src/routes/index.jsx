import React from "react";
import Login from '../pages/login'
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={"/login"} component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
