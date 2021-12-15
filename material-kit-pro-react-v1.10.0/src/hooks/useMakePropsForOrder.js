import useDeliveryInfoForm from "./useDeliveryInfoForm";
import useMakePaymentInfoCardProps from "./useMakePaymentInfoCardProps";
import useOrdererInfoForm from "./useOrdererInfoForm";

export default function useMakePropsForOrder({
  products,
  userInfoFromServer,
  defaultDeliveryInfoFromServer,
}) {
  const { ordererInfo, ordererInfoFormProps } = useOrdererInfoForm({
    isSubmitButtonClicked: false,
    userInfoFromServer,
  });
  const { deliveryInfo, deliveryInfoFormProps } = useDeliveryInfoForm({
    isSubmitButtonClicked: false,
    defaultDeliveryInfoFromServer,
  });
  const paymentInfoCardProps = useMakePaymentInfoCardProps({
    products,
    ordererInfo,
    deliveryInfo,
  });

  return { ordererInfoFormProps, deliveryInfoFormProps, paymentInfoCardProps };
}
