import { gql } from "@apollo/client";

const UPSERT_BASKET = gql`
  mutation UpsertBasketMutation($upsertBasketInput: UpsertBasketInput!) {
    upsertBasket(upsertBasketInput: $upsertBasketInput) {
      id
      userId
      productOptionRelationId
      quantity
    }
  }
`;

export default UPSERT_BASKET;
