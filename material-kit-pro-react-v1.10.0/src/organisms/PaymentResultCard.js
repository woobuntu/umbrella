import React, { Fragment } from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import WhiteCardTitle from "atoms/Title/WhiteCardTitle";
import PaymentAmountInfo from "molecules/PaymentAmountInfo";
import SpaceBetween from "atoms/Container/SpaceBetween";
import { convertPrice } from "customs/utils";

export default function PaymentResultCard({
  basketTotalPrice,
  deliveryFee,
  platform,
  type,
}) {
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
  platform: PropTypes.string,
  type: PropTypes.string,
};
