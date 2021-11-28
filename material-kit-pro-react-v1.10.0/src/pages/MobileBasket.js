import { MobileItem } from "customs/components/basket/item";
import { BASKETS } from "graphql/query";
import { isModalOpenVar } from "graphql/state";
import { useBasketMutation } from "hooks";
import { useBasketQuery } from "hooks";
import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Basket from "./Basket";
import { ItemPrice } from "customs/components/basket/item";
import { PurchaseButton } from "customs/components/basket";

export default function MobileBasket() {
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

  const history = useHistory();

  const redirectToOrder = () => {
    if (basketData && basketData.length) history.push("/order");
  };

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

  const cart = (
    <Fragment>
      {(basketData ? basketData : []).map(
        ({
          id,
          catalogOptionRelationId,
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

          const amountHandlers = {
            onUp: () => onUp({ catalogOptionRelationId, amount }),
            onDown: () => onDown({ catalogOptionRelationId, amount }),
            onModalOk: removeProductFromBasket(id),
          };

          const removeHandlers = {
            onButtonClick: openModal,
            onModalOk: removeProductFromBasket(id),
          };

          return (
            <MobileItem
              key={id}
              itemState={itemState}
              amountHandlers={amountHandlers}
              removeHandlers={removeHandlers}
            />
          );
        }
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>
          총금액 : <ItemPrice price={totalPrice} />
        </span>
        <PurchaseButton name="주문하기" onClick={redirectToOrder} />
      </div>
    </Fragment>
  );

  return (
    <Basket parallaxTitle="장바구니" cardTitle="장바구니 목록" cart={cart} />
  );
}
