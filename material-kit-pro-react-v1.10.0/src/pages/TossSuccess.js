import usePaymentResult from "hooks/usePaymentResult";
import useReceiverInfo from "hooks/useReceiverInfo";
import useTossSuccess from "hooks/useTossSuccess";
import React from "react";
import { Success } from "templates";

export default function TossSuccess() {
  const { receiverInfoCardProps, receiverInfoSetters } = useReceiverInfo();
  const { paymentResultCardProps, paymentResultSetters } = usePaymentResult();
  useTossSuccess({
    receiverInfoSetters,
    paymentResultSetters,
  });
  return (
    <Success
      receiverInfoCardProps={receiverInfoCardProps}
      paymentResultCardProps={paymentResultCardProps}
    />
  );
}
