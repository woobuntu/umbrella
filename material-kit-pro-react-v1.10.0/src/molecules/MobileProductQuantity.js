import React from "react";
import PropTypes from "prop-types";
import SpaceBetween from "atoms/Container/SpaceBetween";
import ProductRowQuantity from "./ProductRowQuantity";

export default function MobileProductQuantity({
  quantity,
  controlButtonProps,
}) {
  return (
    <SpaceBetween>
      <span>수량</span>
      {/* flexCenter해줘야되려나 */}
      <ProductRowQuantity
        quantity={quantity}
        controlButtonProps={controlButtonProps}
      />
    </SpaceBetween>
  );
}

MobileProductQuantity.propTypes = {
  quantity: PropTypes.number,
  controlButtonProps: PropTypes.shape({
    onClickDownButton: PropTypes.func,
    onClickUpButton: PropTypes.func,
  }),
};
