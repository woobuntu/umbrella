import { useMutation } from "@apollo/client";
import { CREATE_PURCHASE } from "graphql/mutation";

export default function usePurchaseMuation() {
  const [
    createPurchase,
    { loading: createPurchaseLoading, error: createPurchaseError },
  ] = useMutation(CREATE_PURCHASE);

  const purchaseMutations = {
    createPurchase,
  };

  return {
    purchaseMutations,
    purchaseMutationLoading: createPurchaseLoading,
    purchaseMutationError: createPurchaseError,
  };
}
