import { gql } from "@apollo/client";

const UPDATE_DELIVERY = gql`
  mutation Mutation($updateDefaultDeliveryInput: UpdateDefaultDeliveryInput!) {
    updateDefaultDelivery(
      updateDefaultDeliveryInput: $updateDefaultDeliveryInput
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
