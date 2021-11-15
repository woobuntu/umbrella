import { useReactiveVar, useQuery } from "@apollo/client";
import { localStorageBasketVar } from "graphql/state";
import { CATALOGS } from "graphql/query";
import React from "react";
import Order from "./Order";
import { makeOrderTableData, makeMobileOrder } from "customs/utils/order";
import { Cart } from "customs/components/basket";
import { isMobile } from "customs/utils";

export default function OrderForNonUser() {
  const basket = useReactiveVar(localStorageBasketVar);

  const basketList = Object.entries(basket).flatMap(([productId, optionList]) =>
    optionList.map((optionString) =>
      [productId, ...optionString.split(":")].map((string) => Number(string))
    )
  );

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

  const totalPrice = basketList.reduce((prevTotal, [pId, _, amount]) => {
    const { price } = productHash[pId];
    return prevTotal + price * amount;
  }, 0);

  if (isMobile()) {
    const cart = makeMobileOrder({
      basketList,
      productHash,
    });
    return <Order cart={cart} totalPrice={totalPrice} />;
  }

  const tableData = makeOrderTableData({
    basketList,
    productHash,
  });

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액"];

  return (
    <Order
      cart={<Cart tableHead={tableHead} tableData={tableData} />}
      totalPrice={totalPrice}
    />
  );
}
