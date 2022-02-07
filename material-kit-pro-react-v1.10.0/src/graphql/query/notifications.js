import { gql } from "@apollo/client";

const NOTIFICATIONS = gql`
  query Notifications {
    notifications {
      id
      title
      content
      timestamp
    }
  }
`;

export default NOTIFICATIONS;
