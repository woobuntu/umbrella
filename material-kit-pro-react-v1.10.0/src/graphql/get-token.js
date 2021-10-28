import { gql } from "@apollo/client";

const GET_TOKEN = gql`
  mutation Mutation($naverAuthPayload: NaverAuthPayload!) {
    naverSignIn(naverAuthPayload: $naverAuthPayload) {
      accessToken
    }
  }
`;

export default GET_TOKEN;
