import { gql } from "@apollo/client";

const CANCEL_ORDER = gql`
  mutation Mutation($cancelOrderInput: CancelOrderInput!) {
    cancelOrder(cancelOrderInput: $cancelOrderInput) {
      id
    }
  }
`;

export default CANCEL_ORDER;
