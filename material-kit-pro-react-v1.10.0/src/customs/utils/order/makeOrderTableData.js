import React from "react";
import {
  ItemThumbnail,
  ItemName,
  ItemPrice,
} from "customs/components/basket/item";

const makeOrderTableData = ({ basketList, productHash }) => {
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
      <span key={id}>{amount}</span>,
      <ItemPrice key={id} price={price * amount} />,
    ];
  });

  return tableData;
};

export default makeOrderTableData;
