import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  imgContainer: {
    width: "120px",
    maxHeight: "160px",
    overflow: "hidden",
    display: "block",
    "& img": {
      width: "100%",
    },
  },
});

export default function ProductRowThumbnail({ src, alt }) {
  const classes = useStyles();
  return (
    <div className={classes.imgContainer}>
      <img src={src} alt={alt} className={classes.img} />
    </div>
  );
}

ProductRowThumbnail.defaultProps = {
  src: "",
  alt: "상품 썸네일",
};

ProductRowThumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
