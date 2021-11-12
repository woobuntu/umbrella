import React from "react";
import { itemThumbnailStyle } from "customs/assets/styles/basket/item";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles(itemThumbnailStyle);

export default function ItemThumbnail({ src, alt }) {
  const classes = useStyles();

  return (
    <div className={classes.imgContainer}>
      {/* classes.img는 존재하지 않지 않나... */}
      <img src={src} alt={alt} className={classes.img} />
    </div>
  );
}

ItemThumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
