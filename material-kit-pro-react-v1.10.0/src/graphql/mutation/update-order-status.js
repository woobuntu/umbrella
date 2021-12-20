import { gql } from "@apollo/client";

const UPDATE_ORDER_STATUS = gql`
  mutation Mutation($updatePaymentInput: UpdatePaymentInput!) {
    updateOrderStatus(updatePaymentInput: $updatePaymentInput) {
      id
    }
  }
`;

export default UPDATE_ORDER_STATUS;
