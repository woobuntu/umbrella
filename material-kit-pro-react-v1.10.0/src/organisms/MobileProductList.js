import React, { Fragment } from "react";
import PropTypes from "prop-types";
import MobileProductCard from "molecules/MobileProductCard";
import SpaceBetween from "atoms/Container/SpaceBetween";
import { ProductRowPrice } from "atoms/ProductRow";
import PurchaseButton from "atoms/Buttons/PurchaseButton";
import { useHistory } from "react-router-dom";

export default function MobileProductList({
  products,
  onClickRemoveProductButton,
  quantityControlButtonsProps,
}) {
  const basketTotalPrice = products.reduce(
    (sum, { productTotalPrice }) => sum + productTotalPrice,
    0
  );

  const history = useHistory();
  return (
    <Fragment>
      {products.map((product) => (
        <MobileProductCard
          key={product.productId}
          product={product}
          onClickRemoveProductButton={onClickRemoveProductButton}
          quantityControlButtonsProps={quantityControlButtonsProps}
        />
      ))}
      {products && onClickRemoveProductButton && quantityControlButtonsProps && (
        <SpaceBetween>
          <span>
            총상품금액 : <ProductRowPrice price={basketTotalPrice} />
          </span>
          <PurchaseButton
            onClick={() => {
              if (products.length == 0) {
                alert("장바구니에 물건을 담아주세요");
              } else {
                history.push("/order");
              }
            }}
          />
        </SpaceBetween>
      )}
    </Fragment>
  );
}

MobileProductList.defaultProps = {
  products: [],
};

MobileProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.number,
      productName: PropTypes.string,
      optionName: PropTypes.string,
      thumbnailSrc: PropTypes.string,
      thumbnailAlt: PropTypes.string,
      quantity: PropTypes.number,
      productTotalPrice: PropTypes.number,
    })
  ),
  onClickRemoveProductButton: PropTypes.func,
  quantityControlButtonsProps: PropTypes.shape({
    onClickDownButton: PropTypes.func,
    onClickUpButton: PropTypes.func,
  }),
};
