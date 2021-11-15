import { gql } from "@apollo/client";

const HEADER = gql`
  query Query {
    meta {
      name
    }
    gnbs {
      id
      name
      lnbs {
        id
        name
        path
      }
    }
  }
`;

export default HEADER;
