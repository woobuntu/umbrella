import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

// styles
import { container } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles({
  container: {
    ...container,
    zIndex: 1,
  },
});

export default function ContainerWithZindex1({ children }) {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
}

ContainerWithZindex1.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
