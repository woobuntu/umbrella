import { gql } from "@apollo/client";

const DELETE_BASKET = gql`
  mutation Mutation($deleteBasketId: Int!) {
    deleteBasket(id: $deleteBasketId) {
      id
    }
  }
`;

export default DELETE_BASKET;
