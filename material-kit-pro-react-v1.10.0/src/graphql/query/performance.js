import { gql } from "@apollo/client";

const PERFORMANCE = gql`
  query Performances($performanceId: Int!) {
    performance(id: $performanceId) {
      id
      title
      content
      timestamp
      performanceFileRelations {
        file {
          id
          name
          path
          type
        }
      }
    }
  }
`;

export default PERFORMANCE;
