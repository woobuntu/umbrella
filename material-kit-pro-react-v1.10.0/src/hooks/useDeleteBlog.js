import { useMutation } from "@apollo/client";
import { DELETE_PERFORMANCE, DELETE_NOTIFICATION } from "graphql/mutation";
import { useLocation, useHistory } from "react-router-dom";

export default function useBlogMutations() {
  const { pathname } = useLocation();

  const target = pathname.includes("performances")
    ? "performances"
    : "notifications";

  const mutation =
    target === "performances" ? DELETE_PERFORMANCE : DELETE_NOTIFICATION;

  const [deleteBlog] = useMutation(mutation);

  const variables = {};

  const history = useHistory();

  return (id) => {
    variables[
      target === "performances" ? "deletePerformanceId" : "deleteNotificationId"
    ] = id;

    deleteBlog({
      variables,
    })
      .then(({ data }) => {
        history.push(`/${target}`);
      })
      .catch((error) => console.error(Error));
  };
}
