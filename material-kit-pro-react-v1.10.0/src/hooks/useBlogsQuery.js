import { useQuery } from "@apollo/client";
import { NOTIFICATIONS } from "graphql/query";
import { PERFORMANCES } from "graphql/query";

export default function useBlogsQuery(subject) {
  const { data: performances, refetch: performancesRefetch } = useQuery(
    PERFORMANCES,
    {
      skip: subject === "performances" ? false : true,
    }
  );
  const { data: notifications, refetch: notificationsRefetch } = useQuery(
    NOTIFICATIONS,
    {
      skip: subject === "notifications" ? false : true,
    }
  );

  const nestedArray = [];

  const data =
    subject === "performances"
      ? performances?.performances
      : notifications?.notifications;

  if (!data) return { data: [], refetch: () => {} };

  let innerArray = [];
  for (let i = 0; i < data.length; i++) {
    innerArray.push(data[i]);
    if (i % 3 == 2) {
      nestedArray.push(innerArray);
      innerArray = [];
    }
  }

  if (innerArray.length) nestedArray.push(innerArray);
  innerArray = [];

  return {
    data: nestedArray,
    refetch:
      subject === "performances" ? performancesRefetch : notificationsRefetch,
  };
}
