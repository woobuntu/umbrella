import { gql } from "@apollo/client";

const NAVER_SIGN_IN = gql`
  mutation Mutation($naverAuthPayload: NaverAuthPayload!) {
    naverSignIn(naverAuthPayload: $naverAuthPayload) {
      isAuthenticated
    }
  }
`;

export default NAVER_SIGN_IN;
