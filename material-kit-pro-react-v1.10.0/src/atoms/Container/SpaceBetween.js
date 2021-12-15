import React from "react";
import PropTypes from "prop-types";

// styles
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  spaceBetween: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default function SpaceBetween({ children }) {
  const classes = useStyles();
  return <div className={classes.spaceBetween}>{children}</div>;
}

SpaceBetween.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
