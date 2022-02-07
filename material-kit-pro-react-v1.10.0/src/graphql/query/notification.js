import { gql } from "@apollo/client";

const NOTIFICATION = gql`
  query Notification($notificationId: Int!) {
    notification(id: $notificationId) {
      id
      title
      content
      timestamp
      notificationFileRelations {
        id
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

export default NOTIFICATION;
