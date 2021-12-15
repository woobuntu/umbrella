import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  section: {
    padding: "80px 0px",
  },
});

export default function UpDownPaddingSection({ children }) {
  const classes = useStyles();
  return <div className={classes.section}>{children}</div>;
}

UpDownPaddingSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
