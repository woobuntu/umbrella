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
        catalog: { name, price: stringPrice, catalogFileRelations },
        option,
      },
      amount,
    }) => {
      const [{ file }] = catalogFileRelations;

      const price = Number(stringPrice);

      const itemState = {
        id,
        name,
        optionName: option.name,
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
          catalog: { price },
        },
        amount,
      }
    ) => total + Number(price) * amount,
    0
  );

  return <Order cart={cart} totalPrice={totalPrice} basketData={basketData} />;
}
