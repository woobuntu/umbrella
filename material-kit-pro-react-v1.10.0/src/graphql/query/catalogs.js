import { gql } from "@apollo/client";

const CATALOGS = gql`
  query Query($filterCatalogsInput: FilterCatalogsInput) {
    catalogs(filterCatalogsInput: $filterCatalogsInput) {
      id
      name
      price
      catalogFileRelations {
        id
        file {
          id
          name
          path
          type
        }
      }
      catalogOptionRelations {
        id
        option {
          id
          name
        }
      }
    }
  }
`;

export default CATALOGS;
