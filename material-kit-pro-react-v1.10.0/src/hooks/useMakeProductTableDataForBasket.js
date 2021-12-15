import React from "react";

// molecules
import ProductRowQuantity from "molecules/ProductRowQuantity";

// atoms
import { ProductRowName } from "atoms/ProductRow";
import { ProductRowThumbnail } from "atoms/ProductRow";
import { ProductRowOptionName } from "atoms/ProductRow";
import { ProductRowPrice } from "atoms/ProductRow";
import RemoveProductButton from "atoms/ProductRow/RemoveProductButton";
import PurchaseButton from "atoms/Buttons/PurchaseButton";
import { useHistory } from "react-router-dom";

export default function useMakeProductTableDataForBasket({
  products,
  onClickRemoveProductButton,
  quantityControlButtonsProps: { onClickUpButton, onClickDownButton },
}) {
  const tableData = products.map(
    ({
      basketId,
      productId,
      productOptionRelationId,
      productName,
      optionName,
      thumbnailSrc,
      thumbnailAlt,
      quantity,
      price,
      productTotalPrice,
    }) => {
      return [
        <ProductRowThumbnail
          key={basketId}
          src={thumbnailSrc}
          alt={thumbnailAlt}
        />,
        <ProductRowName
          key={basketId}
          productId={productId}
          productName={productName}
        />,
        <ProductRowOptionName key={basketId} optionName={optionName} />,
        <ProductRowPrice key={basketId} price={price} />,
        <ProductRowQuantity
          key={basketId}
          quantity={quantity}
          controlButtonProps={{
            onClickUpButton: () =>
              onClickUpButton({
                productOptionRelationId,
                quantity,
              }),
            onClickDownButton: () =>
              onClickDownButton({
                productOptionRelationId,
                quantity,
                basketId,
              }),
          }}
        />,
        <ProductRowPrice key={basketId} price={productTotalPrice} />,
        <RemoveProductButton
          key={basketId}
          onClick={() => onClickRemoveProductButton(basketId)}
        />,
      ];
    }
  );

  const basketTotalPrice = products.reduce(
    (sum, { productTotalPrice }) => sum + productTotalPrice,
    0
  );

  const history = useHistory();
  tableData.push({
    purchase: true,
    colspan: "3",
    amount: <ProductRowPrice price={basketTotalPrice} />,
    col: {
      colspan: 3,
      text: (
        <PurchaseButton
          onClick={() => {
            if (products.length == 0) {
              alert("장바구니에 물건을 담아주세요");
            } else {
              history.push("/order");
            }
          }}
        />
      ),
    },
  });

  return tableData;
}
