import { gql } from "@apollo/client";

const BASKETS = gql`
  query Query {
    baskets {
      id
      userId
      catalogOptionRelationId
      catalogOptionRelation {
        id
        catalogId
        catalog {
          id
          name
          price
          catalogFileRelations {
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
      amount
    }
  }
`;

export default BASKETS;
