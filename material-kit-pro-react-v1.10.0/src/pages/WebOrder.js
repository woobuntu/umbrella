import { Cart } from "customs/components/basket";
import { ItemPrice } from "customs/components/basket/item";
import { ItemThumbnail, ItemName } from "customs/components/basket/item";
import { useBasketMutation } from "hooks";
import { useBasketQuery } from "hooks";
import React from "react";
import Order from "./Order";

export default function WebOrder() {
  const { basketLoading, basketError, basketData } = useBasketQuery();

  const { basketMutationLoading, basketMutationError, basketMutations } =
    useBasketMutation();

  const isLoading = basketLoading || basketMutationLoading;
  if (isLoading) console.log("로딩중...");

  const error = basketError || basketMutationError;
  if (error) alert(error.message);

  const tableData = (basketData ? basketData : []).map(
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

      return [
        <ItemThumbnail key={id} src={file.path} alt={file.name} />,
        <ItemName key={id} id={id} name={name} />,
        optionName,
        <ItemPrice key={id} price={price} />,
        <span key={id}>{amount}</span>,
        <ItemPrice key={id} price={price * amount} />,
      ];
    }
  );

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액"];

  const cart = <Cart tableHead={tableHead} tableData={tableData} />;

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
