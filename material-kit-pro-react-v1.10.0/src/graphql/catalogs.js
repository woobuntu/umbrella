import { gql } from "@apollo/client";

const CATALOGS = gql`
  query Query {
    catalogs {
      id
      name
      price
      catalogFileRelations {
        file {
          name
          path
        }
      }
    }
  }
`;

export default CATALOGS;
