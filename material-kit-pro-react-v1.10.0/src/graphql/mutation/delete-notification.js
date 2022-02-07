import { gql } from "@apollo/client";

const DELETE_NOTIFICATION = gql`
  mutation DeleteNotification($deleteNotificationId: Int!) {
    deleteNotification(id: $deleteNotificationId) {
      id
      title
      content
      timestamp
    }
  }
`;

export default DELETE_NOTIFICATION;
