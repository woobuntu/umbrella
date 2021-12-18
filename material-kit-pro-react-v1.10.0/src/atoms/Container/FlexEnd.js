import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
});

export default function FlexEnd({ children }) {
  const classes = useStyles();
  return <div className={classes.flexEnd}>{children}</div>;
}

FlexEnd.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
