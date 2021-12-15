import React from "react";
import PropTypes from "prop-types";

// atoms
import { Link } from "react-router-dom";
import InfoArea from "components/InfoArea/InfoArea";

export default function InfoAreaLinked(props) {
  const { path, ...infoAreaProps } = props;
  return (
    <Link to={path}>
      <InfoArea {...infoAreaProps} />
    </Link>
  );
}

InfoAreaLinked.defaultProps = {
  path: "#",
};

InfoAreaLinked.propTypes = {
  path: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  vertical: PropTypes.bool,
  className: PropTypes.string,
};
