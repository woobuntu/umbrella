import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  floatRight: {
    float: "right!important",
  },
});

export default function Autograph({ src, alt }) {
  const classes = useStyles();
  return <img src={src} alt={alt} className={classes.floatRight} />;
}

Autograph.defaultProps = {
  alt: "임원 서명",
};

Autograph.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
};
