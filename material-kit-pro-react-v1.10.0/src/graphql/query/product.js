import { gql } from "@apollo/client";

const PRODUCT = gql`
  query Query($catalogId: Int!) {
    catalog(id: $catalogId) {
      name
      price
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
        }
      }
    }
  }
`;

export default PRODUCT;
