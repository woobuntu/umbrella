import React from "react";
import PropTypes from "prop-types";

// atoms
import SpaceBetween from "atoms/Container/SpaceBetween";
import { Title } from "atoms/Title";
import RemoveProductButton from "atoms/ProductRow/RemoveProductButton";

export default function MobileProductName({ name, onClickRemoveButton }) {
  return (
    <SpaceBetween>
      <Title size={5}>{name}</Title>
      {onClickRemoveButton && (
        <RemoveProductButton onClick={onClickRemoveButton} />
      )}
    </SpaceBetween>
  );
}

MobileProductName.propTypes = {
  name: PropTypes.string,
  onClickRemoveButton: PropTypes.func,
};
