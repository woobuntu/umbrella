import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { itemNameStyle } from "customs/assets/styles/basket/item";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(itemNameStyle);

export default function ItemName({ id, name }) {
  const classes = useStyles();

  return (
    <span>
      <Link to={`/mall/${id}`} className={classes.tdNameAnchor}>
        {name}
      </Link>
    </span>
  );
}

ItemName.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
};
