import React from "react";
import PropTypes from "prop-types";
import SpaceBetween from "atoms/Container/SpaceBetween";
import { ProductRowPrice } from "atoms/ProductRow";

export default function MobileProductPrice({ price }) {
  return (
    <SpaceBetween>
      <span>총금액</span>
      <ProductRowPrice price={price} />
    </SpaceBetween>
  );
}

MobileProductPrice.propTypes = {
  price: PropTypes.number,
};
