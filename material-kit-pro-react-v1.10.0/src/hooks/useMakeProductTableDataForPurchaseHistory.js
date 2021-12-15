import React from "react";

import { ProductRowOptionName } from "atoms/ProductRow";
import { ProductRowPrice } from "atoms/ProductRow";
import { ProductRowName } from "atoms/ProductRow";
import { ProductRowThumbnail } from "atoms/ProductRow";
import ProductRowQuantity from "molecules/ProductRowQuantity";

export default function useMakeProductTableDataForPurchaseHistory({
  purchases,
}) {
  const tableData = purchases.map(
    ({
      basketId,
      thumbnailSrc,
      thumbnailAlt,
      productId,
      productName,
      optionName,
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
        <ProductRowQuantity key={basketId} quantity={quantity} />,
        <ProductRowPrice key={basketId} price={productTotalPrice} />,
      ];
    }
  );

  return tableData;
}
