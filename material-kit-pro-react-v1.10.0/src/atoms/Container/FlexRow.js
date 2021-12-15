import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default function FlexRow({ children }) {
  const classes = useStyles();
  return <div className={classes.flexRow}>{children}</div>;
}

FlexRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
