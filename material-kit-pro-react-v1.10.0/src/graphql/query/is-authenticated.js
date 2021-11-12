import { gql } from "@apollo/client";

const IS_AUTHENTICATED = gql`
  query Query {
    isAuthenticated {
      isAuthenticated
    }
  }
`;

export default IS_AUTHENTICATED;
