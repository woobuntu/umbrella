import React from "react";
import {
  ItemThumbnail,
  ItemName,
  ItemPrice,
  ItemAmount,
  ItemRemove,
} from "customs/components/basket/item";
import { PurchaseButton } from "customs/components/basket";
import { isModalOpenVar } from "graphql/state";
import { Link } from "react-router-dom";

const makeBasketTableData = ({
  basketList,
  productHash,
  controlAmount,
  removeProductFromBasket,
}) => {
  const tableData = basketList.map(([productId, optionId, amount]) => {
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

    return [
      <ItemThumbnail src={file.path} alt={file.name} key={id} />,
      <ItemName id={id} key={id} name={name} />,
      optionName,
      <ItemPrice key={id} price={price} />,
      <ItemAmount
        key={id}
        onAdd={controlAmount({ productId: id, optionId })}
        onRemove={controlAmount({ productId: id, optionId })}
        onOk={(callback) => () => {
          removeProductFromBasket({ productId: id, optionId })(callback);
        }}
      />,
      <ItemPrice key={id} price={price * amount} />,
      <ItemRemove
        key={id}
        onButtonClick={() => isModalOpenVar(true)}
        onModalOk={(callback) => () => {
          removeProductFromBasket({ productId: id, optionId })(callback);
        }}
      />,
    ];
  });

  const totalPrice = basketList.reduce((prevTotal, [pId, _, amount]) => {
    const { price } = productHash[pId];
    return prevTotal + price * amount;
  }, 0);

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

  return tableData;
};

export default makeBasketTableData;
