import React, { useState } from "react";
import {
  AppBar as MaterialAppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
} from "@material-ui/core";
import { Menu as MenuIcon, NavigateNext } from "@material-ui/icons";
import NavigationDrawer from "./NavigationDrawer";
import { useHistory, useLocation } from "react-router-dom";
import { navigation_menu } from "../dummy";

const AppBar = () => {
  const [isSearching, setIsSearching] = useState(false);

  const openDrawer = (): void => setIsSearching(true);
  const closeDrawer = (): void => setIsSearching(false);

  const history = useHistory();
  const pushToHome = () => history.push("/");

  const location = useLocation();

  const showBreadCrumbs = () => {
    const matched = navigation_menu
      .flatMap(({ children }) => children)
      .find(({ link }) => `/${link}` === location.pathname);
    if (matched) {
      return (
        <>
          <NavigateNext />
          <Typography variant="h6">{matched.label}</Typography>
        </>
      );
    }
  };

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
        {showBreadCrumbs()}
      </Toolbar>
      {isSearching && (
        <NavigationDrawer
          closeDrawer={closeDrawer}
          navigationTree={navigation_menu}
        />
      )}
    </MaterialAppBar>
  );
};

export default AppBar;
