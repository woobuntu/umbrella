import { gql } from "@apollo/client";

const PROFILE = gql`
  query Profile {
    profile {
      name
      phone
      email
      userDeliveryRelations {
        default
        delivery {
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
  }
`;

export default PROFILE;
