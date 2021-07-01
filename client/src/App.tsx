import React from "react";
import { AppBar, StickyFooter } from "./components";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Profile,
  History,
  BulletinBoard,
  OrganizationalChart,
  ContactUs,
  Album,
} from "./pages";
import { notice, introduction_images, catalog } from "./dummy";

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
          {/* <Introduction /> */}
          <Album cards={introduction_images} />
        </Route>
        {/* <Route path="/performance">
          <Album />
        </Route> */}
        <Route path="/mall">
          <Album cards={catalog} />
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
        <Route path="/contact">
          <ContactUs />
        </Route>
      </Switch>
      <StickyFooter />
    </div>
  );
}

export default App;
