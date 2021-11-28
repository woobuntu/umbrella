import {
  ItemThumbnail,
  ItemName,
  ItemPrice,
  ItemAmount,
  ItemRemove,
} from "customs/components/basket/item";
import { PurchaseButton } from "customs/components/basket";
import { BASKETS } from "graphql/query";
import { isModalOpenVar } from "graphql/state";
import { useBasketQuery, useBasketMutation } from "hooks";
import React, { useEffect } from "react";
import Basket from "./Basket";
import { useHistory } from "react-router-dom";
import Table from "components/Table/Table.js";
import { Cart } from "customs/components/basket";

export default function WebBasket() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  }, []);

  const { basketLoading, basketError, basketData } = useBasketQuery();
  const { basketMutationLoading, basketMutationError, basketMutations } =
    useBasketMutation();

  const isLoading = basketLoading || basketMutationLoading;
  if (isLoading) console.log("로딩중...");

  const error = basketError || basketMutationError;
  if (error) alert(error.message);

  const removeProductFromBasket = (basketId) => async (e) => {
    await basketMutations.deleteBasket({
      variables: {
        deleteBasketId: basketId,
      },
      refetchQueries: [BASKETS],
    });
  };

  const upsertBasket = ({ direction, catalogOptionRelationId, amount }) => {
    const updatedAmount = direction === "up" ? amount + 1 : amount - 1;

    basketMutations.upsertBasket({
      variables: {
        upsertBasketInput: {
          catalogOptionRelationId,
          amount: updatedAmount,
        },
      },
      refetchQueries: [BASKETS],
    });
  };

  const openModal = () => isModalOpenVar(true);

  const onUp = ({ catalogOptionRelationId, amount }) =>
    upsertBasket({ direction: "up", catalogOptionRelationId, amount });

  const onDown = ({ catalogOptionRelationId, amount }) =>
    amount > 1
      ? upsertBasket({ direction: "down", catalogOptionRelationId, amount })
      : openModal();

  const tableData = (basketData ? basketData : []).map(
    ({
      id,
      catalogOptionRelationId,
      catalogOptionRelation: {
        catalog: { name, price: stringPrice, catalogFileRelations },
        option,
      },
      amount,
    }) => {
      const [{ file }] = catalogFileRelations;

      const price = Number(stringPrice);

      return [
        <ItemThumbnail src={file.path} alt={file.name} key={id} />,
        <ItemName id={id} key={id} name={name} />,
        option.name,
        <ItemPrice key={id} price={price} />,
        <ItemAmount
          key={id}
          amount={amount}
          onUp={() => onUp({ catalogOptionRelationId, amount })}
          onDown={() => onDown({ catalogOptionRelationId, amount })}
          onModalOk={removeProductFromBasket(id)}
        />,
        <ItemPrice key={id} price={price * amount} />,
        <ItemRemove
          key={id}
          onButtonClick={openModal}
          onModalOk={removeProductFromBasket(id)}
        />,
      ];
    }
  );

  const history = useHistory();

  const redirectToOrder = () => {
    if (basketData && basketData.length) history.push("/order");
  };

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

  tableData.push({
    purchase: true,
    colspan: "3",
    amount: <ItemPrice price={totalPrice} />,
    col: {
      colspan: 3,
      text: <PurchaseButton name="주문하기" onClick={redirectToOrder} />,
    },
  });

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액", ""];

  const cart = <Cart tableHead={tableHead} tableData={tableData} />;

  return (
    <Basket parallaxTitle="장바구니" cardTitle="장바구니 목록" cart={cart} />
  );
}
