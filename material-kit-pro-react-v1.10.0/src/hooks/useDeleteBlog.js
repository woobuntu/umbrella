import { useMutation } from "@apollo/client";
import { DELETE_PERFORMANCE, DELETE_NOTIFICATION } from "graphql/mutation";
import { useLocation, useHistory } from "react-router-dom";
import { isLoadingVar } from "graphql/state";

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

    isLoadingVar(true);

    deleteBlog({
      variables,
    })
      .then(({ data }) => {
        isLoadingVar(false);
        history.push(`/${target}`);
      })
      .catch((error) => {
        isLoadingVar(false);
        console.error(error);
      });
  };
}
