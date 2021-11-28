import { gql } from "@apollo/client";

const CREATE_PURCHASE = gql`
  mutation CreatePurchase($createPurchaseInput: CreatePurchaseInput!) {
    createPurchase(createPurchaseInput: $createPurchaseInput) {
      redirectUrl
      state
    }
  }
`;

export default CREATE_PURCHASE;
