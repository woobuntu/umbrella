import React from "react";
import PropTypes from "prop-types";
import { convertPrice } from "utils";

// styles
import { makeStyles } from "@material-ui/styles";
import { grayColor } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  tdNameSmall: {
    color: grayColor[0],
    fontSize: "0.75em",
    fontWeight: "300",
  },
});

export default function ProductRowPrice({ price }) {
  const classes = useStyles();

  return (
    <span>
      <small className={classes.tdNameSmall}>₩</small> {convertPrice(price)}
    </span>
  );
}

ProductRowPrice.defaultProps = {
  price: 0,
};

ProductRowPrice.propTypes = {
  price: PropTypes.number,
};
