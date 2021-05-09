import React, { useState } from "react";
import {
  AppBar as MaterialAppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import NavigationDrawer from "./NavigationDrawer";

const AppBar = () => {
  const [isSearching, setIsSearching] = useState(false);

  const openDrawer = (): void => setIsSearching(true);
  const closeDrawer = (): void => setIsSearching(false);

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
        <Typography variant="h6">함께쓰는우산</Typography>
      </Toolbar>
      {isSearching && <NavigationDrawer closeDrawer={closeDrawer} />}
    </MaterialAppBar>
  );
};

export default AppBar;
