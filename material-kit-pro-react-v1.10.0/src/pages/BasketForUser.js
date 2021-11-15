import { useMutation, useQuery } from "@apollo/client";
import { PurchaseButton } from "customs/components/basket";
import {
  ItemName,
  ItemThumbnail,
  ItemPrice,
  ItemAmount,
  ItemRemove,
} from "customs/components/basket/item";
import { UPSERT_BASKET, DELETE_BASKET } from "graphql/mutation";
import { BASKETS } from "graphql/query";
import { isModalOpenVar } from "graphql/state";
import React from "react";
import Basket from "./Basket";
import { Cart } from "customs/components/basket";
import { isMobile } from "customs/utils";
import { Link } from "react-router-dom";
import { MobileItem } from "customs/components/basket/item";

export default function BasketForUser() {
  const { loading, error, data } = useQuery(BASKETS);

  const [upsertBasket, {}] = useMutation(UPSERT_BASKET);
  const [deleteBasket, {}] = useMutation(DELETE_BASKET);

  if (loading) return <div>로딩중...</div>;
  if (error) console.error(error);

  const { baskets } = data;

  const totalPrice = baskets.reduce(
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

  if (isMobile()) {
    const cart = (
      <div>
        {baskets.map(
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

            const removeProductFromBasket = (callback) => async (e) => {
              await deleteBasket({
                variables: {
                  deleteBasketId: id,
                },
                refetchQueries: [BASKETS],
              });
              callback();
            };

            const itemState = {
              id,
              name,
              optionName: option.name,
              price,
              amount,
              file,
            };

            const amountHandlers = {
              onAdd: () => {
                upsertBasket({
                  variables: {
                    upsertBasketInput: {
                      catalogOptionRelationId,
                      amount: amount + 1,
                    },
                  },
                  refetchQueries: [BASKETS],
                });
              },
              onRemove: () => {
                if (amount - 1 > 0) {
                  upsertBasket({
                    variables: {
                      upsertBasketInput: {
                        catalogOptionRelationId,
                        amount: amount - 1,
                      },
                    },
                    refetchQueries: [BASKETS],
                  });
                } else {
                  isModalOpenVar(true);
                }
              },
              onOk: removeProductFromBasket,
            };

            const removeHandlers = {
              onOk: () => isModalOpenVar(true),
              onModalOk: removeProductFromBasket,
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
          <Link to="/order">
            <PurchaseButton name="주문하기" />
          </Link>
        </div>
      </div>
    );
    return <Basket cart={cart} />;
  }

  const tableData = baskets.map(
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

      const removeProductFromBasket = (callback) => async (e) => {
        await deleteBasket({
          variables: {
            deleteBasketId: id,
          },
          refetchQueries: [BASKETS],
        });
        callback();
      };

      return [
        <ItemThumbnail src={file.path} alt={file.name} key={id} />,
        <ItemName id={id} key={id} name={name} />,
        option.name,
        <ItemPrice key={id} price={price} />,
        <ItemAmount
          key={id}
          amount={amount}
          onAdd={() => {
            upsertBasket({
              variables: {
                upsertBasketInput: {
                  catalogOptionRelationId,
                  amount: amount + 1,
                },
              },
              refetchQueries: [BASKETS],
            });
          }}
          onRemove={() => {
            if (amount - 1 > 0) {
              upsertBasket({
                variables: {
                  upsertBasketInput: {
                    catalogOptionRelationId,
                    amount: amount - 1,
                  },
                },
                refetchQueries: [BASKETS],
              });
            } else {
              isModalOpenVar(true);
            }
          }}
          onOk={removeProductFromBasket}
        />,
        <ItemPrice key={id} price={price * amount} />,
        <ItemRemove
          key={id}
          onButtonClick={() => isModalOpenVar(true)}
          onOk={removeProductFromBasket}
        />,
      ];
    }
  );

  tableData.push({
    purchase: true,
    colspan: "3",
    amount: <ItemPrice price={totalPrice} />,
    col: {
      colspan: 3,
      text: (
        <Link to="/order">
          <PurchaseButton name="주문하기" />
        </Link>
      ),
    },
  });

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액", ""];

  return <Basket cart={<Cart tableHead={tableHead} tableData={tableData} />} />;
}
