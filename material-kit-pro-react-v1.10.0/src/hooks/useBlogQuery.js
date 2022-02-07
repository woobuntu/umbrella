import { useQuery } from "@apollo/client";
import { PERFORMANCE } from "graphql/query";
import { NOTIFICATION } from "graphql/query";

export default function useBlogQuery({ subject, id }) {
  const { data: notificationData } = useQuery(NOTIFICATION, {
    variables: {
      notificationId: id,
    },
    skip: subject === "notifications" && !isNaN(id) ? false : true,
  });
  const { data: performanceData } = useQuery(PERFORMANCE, {
    variables: {
      performanceId: id,
    },
    skip: subject === "performances" && !isNaN(id) ? false : true,
  });

  switch (subject) {
    case "notifications":
      return notificationData?.notification;
    case "performances":
      return performanceData?.performance;
  }
}
