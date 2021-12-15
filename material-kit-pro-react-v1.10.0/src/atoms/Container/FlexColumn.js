import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

export default function FlexColumn({ children }) {
  const classes = useStyles();
  return <div className={classes.flexColumn}>{children}</div>;
}
FlexColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
