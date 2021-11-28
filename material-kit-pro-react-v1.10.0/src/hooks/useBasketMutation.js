import { useMutation } from "@apollo/client";
import { DELETE_BASKET } from "graphql/mutation";
import { UPSERT_BASKET } from "graphql/mutation";

export default function useBasketMutation() {
  const [
    upsertBasket,
    { loading: upsertBasketLoading, error: upsertBasketError },
  ] = useMutation(UPSERT_BASKET);

  const [
    deleteBasket,
    { loading: deleteBasketLoading, error: deleteBasketError },
  ] = useMutation(DELETE_BASKET);

  const basketMutations = {
    upsertBasket,
    deleteBasket,
  };

  return {
    basketMutations,
    basketMutationLoading: upsertBasketLoading || deleteBasketLoading,
    basketMutationError: upsertBasketError || deleteBasketError,
  };
}
