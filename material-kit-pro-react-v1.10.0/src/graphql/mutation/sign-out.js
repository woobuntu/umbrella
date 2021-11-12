import { gql } from "@apollo/client";

const SIGN_OUT = gql`
  mutation Mutation {
    signOut {
      isAuthenticated
    }
  }
`;

export default SIGN_OUT;
