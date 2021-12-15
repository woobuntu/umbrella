import { gql } from "@apollo/client";

const PRODUCT = gql`
  query Query($productId: Int!) {
    product(id: $productId) {
      name
      price
      expirationDate
      storageMethod
      ingredients
      productFileRelations {
        file {
          id
          name
          path
        }
      }
      productOptionRelations {
        id
        option {
          id
          name
          price
        }
      }
    }
  }
`;

export default PRODUCT;
