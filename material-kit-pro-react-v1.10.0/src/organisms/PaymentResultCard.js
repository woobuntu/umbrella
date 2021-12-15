import React, { Fragment } from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import WhiteCardTitle from "atoms/Title/WhiteCardTitle";
import PaymentAmountInfo from "molecules/PaymentAmountInfo";

export default function PaymentResultCard({ basketTotalPrice, deliveryFee }) {
  return (
    <InfoCard
      cardColor="primary"
      bodyContent={
        <Fragment>
          <WhiteCardTitle size={3}>결제정보</WhiteCardTitle>
          <PaymentAmountInfo
            basketTotalPrice={basketTotalPrice}
            deliveryFee={deliveryFee}
          />
        </Fragment>
      }
    />
  );
}
PaymentResultCard.propTypes = {
  basketTotalPrice: PropTypes.number,
  deliveryFee: PropTypes.number,
};
