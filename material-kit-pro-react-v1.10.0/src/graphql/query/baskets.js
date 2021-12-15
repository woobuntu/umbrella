import { gql } from "@apollo/client";

const BASKETS = gql`
  query Query {
    baskets {
      id
      productOptionRelationId
      productOptionRelation {
        id
        productId
        product {
          id
          name
          price
          productFileRelations {
            id
            file {
              id
              name
              path
              type
            }
          }
        }
        optionId
        option {
          id
          name
          price
        }
      }
      quantity
    }
  }
`;

export default BASKETS;
