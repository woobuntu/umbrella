import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import { CustomHeader, CustomFooter } from "./customs/components";
import { Home, SignIn, Mall, Product } from "./pages";

export default function Layout() {
  return (
    <Fragment>
      <CustomHeader />
      <Switch>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/mall/:id">
          <Product />
        </Route>
        <Route path="/mall">
          <Mall />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
      <CustomFooter />
    </Fragment>
  );
}
