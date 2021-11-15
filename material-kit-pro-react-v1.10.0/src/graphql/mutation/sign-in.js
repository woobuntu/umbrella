import { gql } from "@apollo/client";

const KAKAO_SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      isAuthenticated
    }
  }
`;

export default KAKAO_SIGN_IN;
