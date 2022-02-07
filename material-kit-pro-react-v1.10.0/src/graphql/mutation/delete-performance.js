import { gql } from "@apollo/client";

const DELETE_PERFORMANCE = gql`
  mutation DeletePerformance($deletePerformanceId: Int!) {
    deletePerformance(id: $deletePerformanceId) {
      id
      title
      content
      timestamp
    }
  }
`;

export default DELETE_PERFORMANCE;
