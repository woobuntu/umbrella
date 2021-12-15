import { gql } from "@apollo/client";

const STORE_ORDERER_AND_DELIVERY_IN_SESSION = gql`
  mutation Mutation(
    $createDeliveryInput: CreateDeliveryInput!
    $createOrdererInput: CreateOrdererInput!
  ) {
    storeOrdererAndDelivery(
      createDeliveryInput: $createDeliveryInput
      createOrdererInput: $createOrdererInput
    ) {
      orderer {
        name
        phone
        email
      }
      delivery {
        name
        phone
        postCode
        address
        detailAddress
        memo
      }
    }
  }
`;

export default STORE_ORDERER_AND_DELIVERY_IN_SESSION;
