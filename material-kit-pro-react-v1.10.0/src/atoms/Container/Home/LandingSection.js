import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  section: {
    padding: "70px 0",
    textAlign: "center",
  },
});

export default function LandingSection({ children }) {
  const classes = useStyles();
  return <div className={classes.section}>{children}</div>;
}

LandingSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
