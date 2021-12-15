import React from "react";
import PropTypes from "prop-types";
import QuantityControlButton from "./QuantityControlButton";

export default function ProductRowQuantity({ quantity, controlButtonProps }) {
  return (
    <span>
      {quantity}{" "}
      {controlButtonProps && <QuantityControlButton {...controlButtonProps} />}
    </span>
  );
}

ProductRowQuantity.defaultProps = {
  quantity: 1,
};

ProductRowQuantity.propTypes = {
  quantity: PropTypes.number,
  controlButtonProps: PropTypes.shape({
    onClickDownButton: PropTypes.func,
    onClickUpButton: PropTypes.func,
  }),
};
