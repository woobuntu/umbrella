import { MobileItem } from "customs/components/basket/item";
import { useBasketMutation } from "hooks";
import { useBasketQuery } from "hooks";
import React from "react";
import Order from "./Order";

export default function MobileOrder() {
  const { basketLoading, basketError, basketData } = useBasketQuery();

  const { basketMutationLoading, basketMutationError, basketMutations } =
    useBasketMutation();

  const isLoading = basketLoading || basketMutationLoading;
  if (isLoading) console.log("로딩중...");

  const error = basketError || basketMutationError;
  if (error) alert(error.message);

  const cart = (basketData ? basketData : []).map(
    ({
      id,
      catalogOptionRelation: {
        catalog: { name, price: catalogPrice, catalogFileRelations },
        option: { name: optionName, price: optionPrice },
      },
      amount,
    }) => {
      const [{ file }] = catalogFileRelations;

      const price = Number(catalogPrice) + Number(optionPrice);

      const itemState = {
        id,
        name,
        optionName,
        price,
        amount,
        file,
      };

      return <MobileItem key={id} itemState={itemState} />;
    }
  );

  const totalPrice = (basketData ? basketData : []).reduce(
    (
      total,
      {
        catalogOptionRelation: {
          catalog: { price: catalogPrice },
          option: { price: optionPrice },
        },
        amount,
      }
    ) => total + (Number(catalogPrice) + Number(optionPrice)) * amount,
    0
  );

  return <Order cart={cart} totalPrice={totalPrice} basketData={basketData} />;
}
