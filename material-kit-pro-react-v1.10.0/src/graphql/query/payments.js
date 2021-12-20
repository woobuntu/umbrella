import { gql } from "@apollo/client";

const PAYMENTS = gql`
  query Payments {
    payments {
      id
      amount
      deliveryFee
      orderStatus
      type
      platform
      delivery {
        name
        phone
        postCode
        address
        detailAddress
        memo
        numberOfInvoice
      }
      orderer {
        name
        phone
        email
      }
      purchases {
        id
        quantity
        productOptionRelation {
          product {
            id
            name
            price
            productFileRelations {
              id
              file {
                name
                path
                type
              }
            }
          }
          option {
            name
            price
          }
        }
      }
      paymentHistories {
        from
        to
      }
    }
  }
`;

export default PAYMENTS;
