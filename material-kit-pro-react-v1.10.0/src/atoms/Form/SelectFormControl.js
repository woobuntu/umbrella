import React from "react";
import PropTypes from "prop-types";

// atoms
import { FormControl } from "@material-ui/core";

// styles
import { makeStyles } from "@material-ui/styles";
import { grayColor } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles({
  selectFormControl: {
    margin: "0 0 17px 0",
    paddingTop: "27px",
    position: "relative",
    "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
      color: grayColor[13],
    },
  },
});

export default function SelectFormControl({ children }) {
  const classes = useStyles();

  return (
    <FormControl fullWidth className={classes.selectFormControl}>
      {children}
    </FormControl>
  );
}

SelectFormControl.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
