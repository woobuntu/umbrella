import { gql } from "@apollo/client";

const UPDATE_DELIVERY = gql`
  mutation Mutation(
    $deliveryId: Int!
    $updateDeliveryInput: UpdateDeliveryInput!
  ) {
    updateDelivery(
      deliveryId: $deliveryId
      updateDeliveryInput: $updateDeliveryInput
    ) {
      name
      phone
      postCode
      address
      detailAddress
      memo
    }
  }
`;

export default UPDATE_DELIVERY;
