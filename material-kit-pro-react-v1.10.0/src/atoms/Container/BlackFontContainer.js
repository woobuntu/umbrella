import { makeStyles } from "@material-ui/styles";
import React from "react";
import PropTypes from "prop-types";

import { container } from "assets/jss/material-kit-pro-react";

const useStyles = makeStyles({
  container,
});

export default function BlackFontContainer({ children }) {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
}

BlackFontContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
