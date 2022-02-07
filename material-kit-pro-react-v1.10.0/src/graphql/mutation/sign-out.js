import { gql } from "@apollo/client";

const SIGN_OUT = gql`
  mutation Mutation {
    signOut {
      role
    }
  }
`;

export default SIGN_OUT;
