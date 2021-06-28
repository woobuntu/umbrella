import React from "react";
import { AppBar } from "./components";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Profile,
  Introduction,
  History,
  BulletinBoard,
  OrganizationalChart,
} from "./pages";
import { notice } from "./dummy";

function App() {
  return (
    <div>
      <CssBaseline />
      <AppBar />
      {/* 추후 하나의 컴포넌트로 추출? */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/introduction">
          <Introduction />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/notifications">
          <BulletinBoard data={notice} />
        </Route>
        <Route path="/organization-chart">
          <OrganizationalChart />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
