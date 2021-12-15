import React from "react";
import PropTypes from "prop-types";

// templates
import Basket from "templates/Basket";

// organisms
import MobileProductList from "organisms/MobileProductList";

// hooks
import useMakePropsForBasket from "hooks/useMakePropsForBasket";

export default function MobileBasket() {
  const {
    products,
    onClickRemoveProductButton,
    quantityControlButtonsProps,
    deleteBasketModalProps,
  } = useMakePropsForBasket();

  return (
    <Basket deleteBasketModalProps={deleteBasketModalProps}>
      <MobileProductList
        products={products}
        onClickRemoveProductButton={onClickRemoveProductButton}
        quantityControlButtonsProps={quantityControlButtonsProps}
      />
    </Basket>
  );
}
