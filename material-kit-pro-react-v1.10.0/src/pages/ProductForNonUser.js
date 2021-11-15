import { useReactiveVar } from "@apollo/client";
import { setLocalBasket } from "customs/utils";
import { localStorageBasketVar } from "graphql/state";
import { isModalOpenVar } from "graphql/state";
import React from "react";
import Product from "./Product";

export default function ProductForNonUser() {
  const basket = useReactiveVar(localStorageBasketVar);

  let basketAmount = 0;
  for (const key in basket) basketAmount += basket[key].length;

  const setBasket =
    ({ productId, option, amount }) =>
    () => {
      if (!basket) {
        setLocalBasket({
          [productId]: [`${option}:${amount}`],
        });
      } else {
        if (basket.hasOwnProperty(productId)) {
          const indexOfOption = basket[productId].findIndex((value) => {
            const [optionInBasket, _] = value.split(":").map(parseInt);
            return optionInBasket == option;
          });
          if (indexOfOption > -1) {
            const [_, amountInBasket] = basket[productId][indexOfOption]
              .split(":")
              .map((v) => Number(v));
            basket[productId][indexOfOption] = `${option}:${
              amountInBasket + amount
            }`;
          } else {
            basket[productId].push(`${option}:${amount}`);
          }
        } else {
          basket[productId] = [`${option}:${amount}`];
        }
        setLocalBasket(basket);
      }
      isModalOpenVar(true);
    };

  return <Product setBasket={setBasket} basketAmount={basketAmount} />;
}
