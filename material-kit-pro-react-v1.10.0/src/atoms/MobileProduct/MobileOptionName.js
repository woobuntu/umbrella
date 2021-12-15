import React from "react";
import PropTypes from "prop-types";
import SpaceBetween from "atoms/Container/SpaceBetween";

export default function MobileOptionName({ name }) {
  return (
    <SpaceBetween>
      <span>옵션</span>
      <span>{name}</span>
    </SpaceBetween>
  );
}

MobileOptionName.propTypes = {
  name: PropTypes.string,
};
