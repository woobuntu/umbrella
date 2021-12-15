import React from "react";
import Title from "./Title";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { description } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  cardCategory: {
    ...description,
  },
  marginBottom30: {
    marginBottom: "30px",
  },
});

export default function CardTitle({ size, children }) {
  const classes = useStyles();
  return (
    <Title
      size={size}
      className={classes.cardCategory + " " + classes.marginBottom30}
    >
      {children}
    </Title>
  );
}

CardTitle.propTypes = {
  size: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};
