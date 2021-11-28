import { useQuery, useReactiveVar } from "@apollo/client";
import { BASKETS } from "graphql/query";
import { isAuthenticatedVar } from "graphql/state";

export default function useBasket() {
  const isAuthenticated = useReactiveVar(isAuthenticatedVar);

  const {
    loading: basketLoading,
    error: basketError,
    data,
  } = useQuery(BASKETS, {
    skip: !isAuthenticated,
  });

  return {
    basketLoading,
    basketError,
    basketData: data ? data.baskets : null,
  };
}
