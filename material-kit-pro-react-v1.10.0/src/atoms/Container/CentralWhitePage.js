import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import React from "react";
import { main, mainRaised } from "assets/jss/material-kit-pro-react";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  main,
  mainRaised,
});

export default function CentralWhitePage({ children }) {
  const classes = useStyles();
  return (
    <div className={classNames(classes.main, classes.mainRaised)}>
      {children}
    </div>
  );
}

CentralWhitePage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
