import React from "react";
import { itemPriceStyle } from "customs/assets/styles/basket/item";
import { convertPrice } from "customs/utils";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(itemPriceStyle);

export default function ItemPrice({ price }) {
  const classes = useStyles();

  return (
    <span>
      <small className={classes.tdNameSmall}>₩</small>
      {convertPrice(price)}
    </span>
  );
}

ItemPrice.propTypes = {
  price: PropTypes.number,
};
