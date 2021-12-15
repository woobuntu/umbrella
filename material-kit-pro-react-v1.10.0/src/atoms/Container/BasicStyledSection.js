import { makeStyles } from "@material-ui/styles";
import React from "react";
import PropTypes from "prop-types";

import { grayColor } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  section: {
    paddingBottom: "0",
    backgroundPosition: "50%",
    backgroundSize: "cover",
    padding: "70px 0",
    "& p": {
      fontSize: "1.188rem",
      lineHeight: "1.5em",
      color: grayColor[15],
      marginBottom: "30px",
    },
  },
});

export default function BasicStyledSection({ children }) {
  const classes = useStyles();
  return <div className={classes.section}>{children}</div>;
}

BasicStyledSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
