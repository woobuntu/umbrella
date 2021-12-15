import React from "react";
import PropTypes from "prop-types";

// atoms
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

// styles
import { grayColor } from "assets/jss/material-kit-pro-react.js";
const useStyles = makeStyles({
  tdNameAnchor: {
    color: grayColor[1],
  },
});

export default function ProductRowName({ productName, productId }) {
  const classes = useStyles();
  return (
    <span>
      <Link to={`/mall/${productId}`} className={classes.tdNameAnchor}>
        {productName}
      </Link>
    </span>
  );
}

ProductRowName.defaultProps = {
  productId: 1,
  productName: "",
};

ProductRowName.propTypes = {
  productName: PropTypes.string,
  productId: PropTypes.number,
};
