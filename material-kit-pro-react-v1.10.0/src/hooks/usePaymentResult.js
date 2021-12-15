import { useState } from "react";

export default function usePaymentResult() {
  const [basketTotalPrice, setBasketTotalPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);

  return {
    paymentResultCardProps: {
      basketTotalPrice,
      deliveryFee,
    },
    paymentResultSetters: {
      setBasketTotalPrice,
      setDeliveryFee,
    },
  };
}
