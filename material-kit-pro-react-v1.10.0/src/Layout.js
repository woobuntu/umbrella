import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomHeader, CustomFooter } from "./customs/components";
import { Home } from "./pages";

export default function Layout() {
  return (
    <Fragment>
      <CustomHeader />
      <Switch>
        <Route to="/">
          <Home />
        </Route>
      </Switch>
      <CustomFooter />
    </Fragment>
  );
}
