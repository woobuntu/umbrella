import React from "react";
import PropTypes from "prop-types";

// atoms
import Title from "./Title";

// styles
import { makeStyles } from "@material-ui/styles";
import { title, whiteColor } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles({
  title: {
    ...title,
    "&, & + h4": {
      color: whiteColor,
    },
  },
});

export default function BasketParallaxTitle() {
  const classes = useStyles();

  return (
    <Title size={2} className={classes.title}>
      장바구니
    </Title>
  );
}
