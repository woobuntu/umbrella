import React from "react";
import { MobileItem } from "./item";
import PropTypes from "prop-types";

export default function MobileCart({ items, amountHandlers, removeHandlers }) {
  return (
    <div>
      {items.map((item) => (
        <MobileItem
          key={item.id}
          itemState={item}
          amountHandlers={amountHandlers}
          removeHandlers={removeHandlers}
        />
      ))}
    </div>
  );
}

MobileCart.propTypes = {
  items: PropTypes.array,
  amountHandlers: PropTypes.objectOf(PropTypes.func),
  removeHandlers: PropTypes.objectOf(PropTypes.func),
};
