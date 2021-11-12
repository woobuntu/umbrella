import React from "react";
import { MobileItem } from "customs/components/basket/item";

const makeMobileOrder = ({ basketList, productHash }) =>
  basketList.map(([productId, optionId, amount]) => {
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

    return <MobileItem key={id} itemState={itemState} />;
  });

export default makeMobileOrder;
