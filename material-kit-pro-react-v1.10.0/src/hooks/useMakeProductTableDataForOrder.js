import React from "react";

// molecules
import ProductRowQuantity from "molecules/ProductRowQuantity";

// atoms
import { ProductRowName } from "atoms/ProductRow";
import { ProductRowThumbnail } from "atoms/ProductRow";
import { ProductRowOptionName } from "atoms/ProductRow";
import { ProductRowPrice } from "atoms/ProductRow";

export default function useMakeProductTableDataForOrder({ products }) {
  const tableData = products.map(
    ({
      basketId,
      productId,
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
        <ProductRowQuantity key={basketId} quantity={quantity} />,
        <ProductRowPrice key={basketId} price={productTotalPrice} />,
      ];
    }
  );

  return tableData;
}
