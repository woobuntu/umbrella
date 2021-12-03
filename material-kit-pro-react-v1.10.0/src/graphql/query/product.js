import { gql } from "@apollo/client";

const PRODUCT = gql`
  query Query($catalogId: Int!) {
    catalog(id: $catalogId) {
      name
      price
      expirationDate
      storageMethod
      ingredients
      catalogFileRelations {
        file {
          id
          name
          path
        }
      }
      catalogOptionRelations {
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
