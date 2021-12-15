import { makeStyles } from "@material-ui/styles";
import React from "react";
import Title from "./Title";
import { title } from "assets/jss/material-kit-pro-react.js";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  title,
});

export default function BasicStyledTitle({ children }) {
  const classes = useStyles();

  return (
    <Title size={3} className={classes.title}>
      {children}
    </Title>
  );
}

BasicStyledTitle.propTypes = {
  children: PropTypes.string,
};
