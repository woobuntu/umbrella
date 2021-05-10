import React from "react";
import { AppBar } from "./components";
import { CssBaseline } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import { Home } from "./pages";

function App() {
  return (
    <div>
      <CssBaseline />
      <AppBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
