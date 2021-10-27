import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import { CustomHeader } from "./customs";

export default function Layout() {
  return (
    <Fragment>
      <CustomHeader />
      <Switch></Switch>
    </Fragment>
  );
}
