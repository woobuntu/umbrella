import { gql } from "@apollo/client";

const BASKETS_AND_PROFILE = gql`
  query Baskets {
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
    profile {
      id
      name
      phone
      email
      defaultDelivery {
        id
        name
        phone
        postCode
        address
        detailAddress
        memo
      }
    }
  }
`;

export default BASKETS_AND_PROFILE;
