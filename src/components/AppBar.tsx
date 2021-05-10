import React, { useState } from "react";
import {
  AppBar as MaterialAppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import NavigationDrawer from "./NavigationDrawer";
import { useHistory } from "react-router-dom";

const AppBar = () => {
  const [isSearching, setIsSearching] = useState(false);

  const openDrawer = (): void => setIsSearching(true);
  const closeDrawer = (): void => setIsSearching(false);

  const history = useHistory();
  const pushToHome = () => history.push("/");

  return (
    <MaterialAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={openDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">
          <Link color="inherit" onClick={pushToHome}>
            함께쓰는우산
          </Link>
        </Typography>
      </Toolbar>
      {isSearching && <NavigationDrawer closeDrawer={closeDrawer} />}
    </MaterialAppBar>
  );
};

export default AppBar;
