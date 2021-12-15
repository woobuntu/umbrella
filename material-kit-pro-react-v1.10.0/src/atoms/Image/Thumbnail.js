import React from "react";
import PropTypes from "prop-types";
import basicThumbnail from "customs/assets/img/smiling-face.png";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";

import { hexToRgb, blackColor } from "assets/jss/material-kit-pro-react.js";

const useStyles = makeStyles({
  imgRaised: {
    boxShadow:
      "0 5px 15px -8px rgba(" +
      hexToRgb(blackColor) +
      ", 0.24), 0 8px 10px -5px rgba(" +
      hexToRgb(blackColor) +
      ", 0.2)",
  },
  imgRoundedCircle: {
    borderRadius: "50% !important",
  },
  imgFluid: {
    maxWidth: "100%",
    height: "auto",
  },
});

export default function Thumbnail({ src, alt }) {
  const classes = useStyles();

  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );

  return <img src={src} alt={alt} className={imageClasses} />;
}

Thumbnail.defaultProps = {
  src: basicThumbnail,
  alt: "썸네일",
};

Thumbnail.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};
