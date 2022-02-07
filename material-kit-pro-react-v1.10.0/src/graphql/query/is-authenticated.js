import { gql } from "@apollo/client";

const IS_AUTHENTICATED = gql`
  query IsAuthenticated {
    isAuthenticated {
      role
      redirectUrl
    }
  }
`;

export default IS_AUTHENTICATED;
