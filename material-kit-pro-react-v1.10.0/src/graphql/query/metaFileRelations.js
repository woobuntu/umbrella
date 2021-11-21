import { gql } from "@apollo/client";

const META_FILE_RELATIONS = gql`
  query Query($type: String!) {
    metaFileRelations(type: $type) {
      file {
        id
        name
        path
        type
      }
    }
  }
`;

export default META_FILE_RELATIONS;
