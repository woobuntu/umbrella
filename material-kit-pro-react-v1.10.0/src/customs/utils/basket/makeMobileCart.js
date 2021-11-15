import React from "react";
import { MobileItem } from "customs/components/basket/item";
import { isModalOpenVar } from "graphql/state";
import { PurchaseButton } from "customs/components/basket";
import { ItemPrice } from "customs/components/basket/item";
import { Link } from "react-router-dom";

const makeMobileCart = ({
  basketList,
  productHash,
  controlAmount,
  removeProductFromBasket,
}) => {
  const totalPrice = basketList.reduce((prevTotal, [pId, _, amount]) => {
    const { price } = productHash[pId];
    return prevTotal + price * amount;
  }, 0);
  return (
    <div>
      {basketList.map(([productId, optionId, amount]) => {
        const {
          id,
          name,
          price,
          catalogFileRelations: [{ file }],
          catalogOptionRelations: options,
        } = productHash[productId];

        const [{ option: matchedOption }] = options.filter(
          ({ option: { id } }) => id == optionId
        );

        const optionName = matchedOption.name;

        const itemState = { id, name, optionName, price, amount, file };

        const amountHandlers = {
          onAdd: controlAmount({ productId: id, optionId }),
          onRemove: controlAmount({ productId: id, optionId }),
          onOk: (callback) => () => {
            removeProductFromBasket({ productId: id, optionId })(callback);
          },
        };

        const removeHandlers = {
          onButtonClick: () => isModalOpenVar(true),
          onModalOk: (callback) => () => {
            removeProductFromBasket({ productId: id, optionId })(callback);
          },
        };

        return (
          <MobileItem
            key={id}
            itemState={itemState}
            amountHandlers={amountHandlers}
            removeHandlers={removeHandlers}
          />
        );
      })}
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
};
export default makeMobileCart;
