import React from "react";
import PropTypes from "prop-types";

// atoms
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import MobileProductThumbnail from "atoms/MobileProduct/MobileProductThumbnail";
import { VerticalCardBody } from "atoms/Container";
import MobileProductName from "atoms/MobileProduct/MobileProductName";
import MobileOptionName from "atoms/MobileProduct/MobileOptionName";
import MobileProductPrice from "atoms/MobileProduct/MobileProductPrice";

// molecules
import MobileProductQuantity from "./MobileProductQuantity";

export default function MobileProductCard({
  product,
  onClickRemoveProductButton,
  quantityControlButtonsProps,
}) {
  const {
    basketId,
    thumbnailSrc,
    thumbnailAlt,
    productId,
    productOptionRelationId,
    productName,
    optionName,
    quantity,
    // price,
    productTotalPrice,
  } = product;

  const controlButtonProps = quantityControlButtonsProps
    ? {
        onClickUpButton: () =>
          quantityControlButtonsProps.onClickUpButton({
            productOptionRelationId,
            quantity,
          }),
        onClickDownButton: () =>
          quantityControlButtonsProps.onClickDownButton({
            productOptionRelationId,
            quantity,
            basketId,
          }),
      }
    : null;

  return (
    <Card blog>
      <MobileProductThumbnail
        productId={productId}
        src={thumbnailSrc}
        alt={thumbnailAlt}
      />
      <VerticalCardBody>
        <MobileProductName
          name={productName}
          onClickRemoveButton={
            onClickRemoveProductButton &&
            (() => onClickRemoveProductButton(basketId))
          }
        />
        <MobileOptionName name={optionName} />
        <MobileProductQuantity
          quantity={quantity}
          controlButtonProps={controlButtonProps}
        />
        <MobileProductPrice price={productTotalPrice} />
      </VerticalCardBody>
    </Card>
  );
}

MobileProductCard.propTypes = {
  product: PropTypes.shape({
    basketId: PropTypes.number,
    productId: PropTypes.number,
    productOptionRelationId: PropTypes.number,
    productName: PropTypes.string,
    optionName: PropTypes.string,
    thumbnailSrc: PropTypes.string,
    thumbnailAlt: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    productTotalPrice: PropTypes.number,
  }),
  onClickRemoveProductButton: PropTypes.func,
  quantityControlButtonsProps: PropTypes.shape({
    onClickDownButton: PropTypes.func,
    onClickUpButton: PropTypes.func,
  }),
};
