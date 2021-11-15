import { gql } from "@apollo/client";

const UPSERT_BASKET = gql`
  mutation UpsertBasketMutation($upsertBasketInput: UpsertBasketInput!) {
    upsertBasket(upsertBasketInput: $upsertBasketInput) {
      id
      userId
      catalogOptionRelationId
      amount
    }
  }
`;

export default UPSERT_BASKET;
