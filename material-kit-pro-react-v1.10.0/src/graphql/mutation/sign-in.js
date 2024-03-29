import { gql } from "@apollo/client";

const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      role
      redirectUrl
    }
  }
`;

export default SIGN_IN;
