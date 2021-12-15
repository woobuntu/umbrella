import useKakaoSuccess from "hooks/useKakaoSuccess";
import usePaymentResult from "hooks/usePaymentResult";
import useReceiverInfo from "hooks/useReceiverInfo";
import React from "react";
import { Success } from "templates";

export default function KakaoSuccess() {
  const { receiverInfoCardProps, receiverInfoSetters } = useReceiverInfo();
  const { paymentResultCardProps, paymentResultSetters } = usePaymentResult();
  useKakaoSuccess({
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
