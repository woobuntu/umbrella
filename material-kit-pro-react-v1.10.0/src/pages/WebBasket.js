import React from "react";
import PropTypes from "prop-types";

// templates
import Basket from "templates/Basket";

// organisms
import ProductTable from "organisms/ProductTable";

// hooks
import useMakeProductTableDataForBasket from "hooks/useMakeProductTableDataForBasket";
import useMakePropsForBasket from "hooks/useMakePropsForBasket";

export default function WebBasket() {
  const {
    products,
    quantityControlButtonsProps,
    deleteBasketModalProps,
    onClickRemoveProductButton,
  } = useMakePropsForBasket();

  const productTableData = useMakeProductTableDataForBasket({
    products,
    onClickRemoveProductButton,
    quantityControlButtonsProps,
  });

  const tableHead = ["", "상품명", "옵션", "가격", "수량", "총금액", ""];

  return (
    <Basket deleteBasketModalProps={deleteBasketModalProps}>
      <ProductTable tableHead={tableHead} tableData={productTableData} />
    </Basket>
  );
}
