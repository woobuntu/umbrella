import { useMutation } from "@apollo/client";
import { STORE_ORDERER_AND_DELIVERY_IN_SESSION } from "graphql/mutation";

export default function useStoreOrdererAndDeliveryInSession({
  ordererInfo,
  deliveryInfo,
}) {
  const [storeOrdererAndDeliveryInSession] = useMutation(
    STORE_ORDERER_AND_DELIVERY_IN_SESSION
  );

  return () =>
    storeOrdererAndDeliveryInSession({
      variables: {
        createOrdererInput: ordererInfo,
        createDeliveryInput: deliveryInfo,
      },
    });
}
