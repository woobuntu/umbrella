import { useMutation, useQuery } from "@apollo/client";
import { UPSERT_BASKET } from "graphql/mutation";
import { BASKETS } from "graphql/query";
import { isModalOpenVar } from "graphql/state";
import React, { useState, useEffect } from "react";
import Product from "./Product";

export default function ProductForUser() {
  const [upsertBasket, { loading, error }] = useMutation(UPSERT_BASKET);
  const [basketAmount, setBasketAmount] = useState(0);

  const { data } = useQuery(BASKETS);

  useEffect(() => {
    if (data) {
      const { baskets } = data;

      setBasketAmount(baskets.length);
    }
  }, [data]);

  if (loading) console.log(loading);
  if (error) console.error(error);

  const setBasket =
    ({ catalogOptionRelationId, amount }) =>
    async () => {
      try {
        await upsertBasket({
          variables: {
            upsertBasketInput: {
              catalogOptionRelationId,
              amount,
            },
          },
          refetchQueries: [BASKETS],
        });
        isModalOpenVar(true);
      } catch (error) {
        console.error(error);
      }
    };

  return <Product setBasket={setBasket} basketAmount={basketAmount} />;
}
