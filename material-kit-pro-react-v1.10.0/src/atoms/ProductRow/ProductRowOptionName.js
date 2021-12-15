import React from "react";
import PropTypes from "prop-types";

export default function ProductRowOptionName({ optionName }) {
  return <span>{optionName}</span>;
}

ProductRowOptionName.propTypes = {
  optionName: PropTypes.string,
};
