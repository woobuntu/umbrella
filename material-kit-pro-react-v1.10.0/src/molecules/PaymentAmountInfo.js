import React from "react";
import PropTypes from "prop-types";
import SpaceBetween from "atoms/Container/SpaceBetween";
import { convertPrice } from "utils";

export default function PaymentAmountInfo({ basketTotalPrice, deliveryFee }) {
  return (
    <ul>
      <li>
        <SpaceBetween>
          <span>총상품금액</span>
          <span>{convertPrice(basketTotalPrice)}</span>
        </SpaceBetween>
      </li>
      <li>
        <SpaceBetween>
          <span>배송료</span>
          <span>{convertPrice(deliveryFee)}</span>
        </SpaceBetween>
      </li>
      <li>
        <SpaceBetween>
          <span>
            <strong>최종결제금액</strong>
          </span>
          <span>
            <strong>{convertPrice(basketTotalPrice + deliveryFee)}</strong>
          </span>
        </SpaceBetween>
      </li>
    </ul>
  );
}
PaymentAmountInfo.defaultProps = {
  basketTotalPrice: 0,
  deliveryFee: 0,
};

PaymentAmountInfo.propTypes = {
  basketTotalPrice: PropTypes.number,
  deliveryFee: PropTypes.number,
};
