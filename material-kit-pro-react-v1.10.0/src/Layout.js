import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import { CustomHeader, CustomFooter } from "./customs/components";

export default function Layout() {
  return (
    <Fragment>
      <CustomHeader />
      <Switch></Switch>
      <CustomFooter />
    </Fragment>
  );
}
