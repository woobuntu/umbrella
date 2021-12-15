import { useState } from "react";
import useDeliveryInfoForm from "./useDeliveryInfoForm";
import useMakePaymentInfoCardProps from "./useMakePaymentInfoCardProps";
import useOrdererInfoForm from "./useOrdererInfoForm";

export default function useMakePropsForOrder({
  products,
  userInfoFromServer,
  defaultDeliveryInfoFromServer,
}) {
  const [isSubmitButtonClicked, setIsSubmitButtonClicked] = useState(false);
  const { ordererInfo, ordererInfoFormProps, isOrdererInfoValid } =
    useOrdererInfoForm({
      isSubmitButtonClicked,
      userInfoFromServer,
    });
  const { deliveryInfo, deliveryInfoFormProps, isDeliveryInfoValid } =
    useDeliveryInfoForm({
      isSubmitButtonClicked,
      defaultDeliveryInfoFromServer,
    });

  const validateForm = () => {
    setIsSubmitButtonClicked(true);
    const isOrdererAndDeliveryValid = isOrdererInfoValid && isDeliveryInfoValid;
    return isOrdererAndDeliveryValid;
  };

  const paymentInfoCardProps = useMakePaymentInfoCardProps({
    products,
    ordererInfo,
    deliveryInfo,
    validateForm,
  });

  return { ordererInfoFormProps, deliveryInfoFormProps, paymentInfoCardProps };
}
