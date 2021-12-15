import { makeStyles } from "@material-ui/styles";
import React from "react";
import PropTypes from "prop-types";

import { container, whiteColor } from "assets/jss/material-kit-pro-react";

const useStyles = makeStyles({
  container: {
    color: whiteColor,
    ...container,
    zIndex: 2,
  },
});

// container styling을 적용한 'div'라서 atom
export default function WhiteFontContainer({ children }) {
  const classes = useStyles();
  return <div className={classes.container}>{children}</div>;
}

WhiteFontContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
