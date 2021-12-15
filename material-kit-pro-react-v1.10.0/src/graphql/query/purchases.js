import { gql } from "@apollo/client";

const PURCHASES = gql`
  query Purchases {
    purchases {
      id
      amount
      productOptionRelation {
        product {
          name
          price
          productFileRelations {
            file {
              id
              name
              path
            }
          }
        }
        option {
          id
          name
          price
        }
      }
      delivery {
        name
        phone
        postCode
        address
        detailAddress
        memo
        orderStatus
      }
      payment {
        platform
        amount
        deliveryFee
      }
      purchaseHistories {
        from
      }
    }
  }
`;

export default PURCHASES;
