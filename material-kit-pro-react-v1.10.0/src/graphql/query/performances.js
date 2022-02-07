import { gql } from "@apollo/client";

const PERFORMANCES = gql`
  query Performances {
    performances {
      id
      title
      content
      timestamp
    }
  }
`;

export default PERFORMANCES;
