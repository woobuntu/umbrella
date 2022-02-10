import { gql } from "@apollo/client";

const HISTORIES = gql`
  query Histories {
    histories {
      date
      event
    }
  }
`;

export default HISTORIES;
