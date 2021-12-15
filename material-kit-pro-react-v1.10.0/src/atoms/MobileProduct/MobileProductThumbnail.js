import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

// styles
import { makeStyles } from "@material-ui/styles";
import { coloredShadow } from "assets/jss/material-kit-pro-react.js";
import CardAvatar from "components/Card/CardAvatar";
const useStyles = makeStyles({
  coloredShadow,
});

export default function MobileProductThumbnail({ productId, src, alt }) {
  const classes = useStyles();
  return (
    <Fragment>
      <CardAvatar profile>
        <Link to={`/mall/${productId}`}>
          <img src={src} alt={alt} />
        </Link>
      </CardAvatar>
      <div
        className={classes.coloredShadow}
        style={{
          backgroundImage: `url(${src})`,
          opacity: "1",
        }}
      />
    </Fragment>
  );
}

MobileProductThumbnail.defaultProps = {
  productId: 0,
  src: "",
  alt: "",
};

MobileProductThumbnail.propTypes = {
  productId: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
};
