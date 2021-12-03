import { gql } from "@apollo/client";

const UPDATE_PROFILE = gql`
  mutation Mutation($updateUserInput: UpdateUserInput!) {
    updateProfile(updateUserInput: $updateUserInput) {
      name
      email
      phone
    }
  }
`;

export default UPDATE_PROFILE;
