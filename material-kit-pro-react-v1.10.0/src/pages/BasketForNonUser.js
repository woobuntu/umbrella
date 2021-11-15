import { useReactiveVar, useQuery } from "@apollo/client";
import { setLocalBasket } from "customs/utils";
import { makeBasketTableData } from "customs/utils/basket";
import { localStorageBasketVar } from "graphql/state";
import { CATALOGS } from "graphql/query";
import React from "react";
import Basket from "./Basket";
import { isModalOpenVar } from "graphql/state";
import { Cart } from "customs/components/basket";
import { isMobile } from "customs/utils";
import { makeMobileCart } from "customs/utils/basket";

export default function BasketForNonUser() {
  const basket = useReactiveVar(localStorageBasketVar);

  const basketList = Object.entries(basket).flatMap(([productId, optionList]) =>
    optionList.map((optionString) =>
      [productId, ...optionString.split(":")].map((string) => Number(string))
    )
  );

  const getOptionIndex = ({ productId, optionId }) =>
    basket[productId].findIndex((string) => {
      const [oId, amount] = string.split(":").map((v) => Number(v));
      return oId == optionId;
    });

  const controlAmount =
    ({ productId, optionId }) =>
    (e) => {
      const {
        currentTarget: { name },
      } = e;

      const optionIndex = getOptionIndex({ productId, optionId });

      const [_, originalAmount] = basket[productId][optionIndex]
        .split(":")
        .map((v) => Number(v));

      switch (name) {
        case "add":
          basket[productId][optionIndex] = `${optionId}:${originalAmount + 1}`;
          setLocalBasket(basket);
          break;
        case "remove":
          if (originalAmount - 1 > 0) {
            basket[productId][optionIndex] = `${optionId}:${
              originalAmount - 1
            }`;
            setLocalBasket(basket);
          } else {
            isModalOpenVar(true);
          }
          break;
        default:
          alert("수량을 늘리거나 줄일 수만 있습니다!");
      }
    };

  const removeProductFromBasket =
    ({ productId, optionId }) =>
    (callback) => {
      const optionIndex = getOptionIndex({ productId, optionId });
      basket[productId].splice(optionIndex, 1);
      setLocalBasket(basket);
      if (callback) callback();
    };

  const productIds = basketList.map(([productId]) => productId);
  const { loading, error, data } = useQuery(CATALOGS, {
    variables: {
      filterCatalogsInput: {
        ids: productIds,
      },
    },
  });

  if (loading) return <div>로딩중...</div>;
  if (error) console.error(error);

  const productHash = data.catalogs.reduce((hash, cur) => {
    hash[cur.id] = cur;
    return hash;
  }, {});

  if (isMobile()) {
    const cart = makeMobileCart({
      basketList,
      productHash,
      controlAmount,
      removeProductFromBasket,
    });
    return <Basket cart={cart} />;
  }

  const tableData = makeBasketTableData({
    basketList,
    productHash,
    controlAmount,
    removeProductFromBasket,
  });

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액", ""];

  const cart = <Cart tableHead={tableHead} tableData={tableData} />;

  return <Basket cart={cart} />;
}
