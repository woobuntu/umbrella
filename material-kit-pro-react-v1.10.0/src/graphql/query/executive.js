import { gql } from "@apollo/client";

const EXECUTIVE = gql`
  query Query($executiveId: Int!) {
    executive(id: $executiveId) {
      id
      name
      position
      greeting
      executiveFileRelations {
        id
        file {
          id
          name
          path
          type
        }
      }
      careers {
        id
        record
        classification
      }
    }
  }
`;

export default EXECUTIVE;
