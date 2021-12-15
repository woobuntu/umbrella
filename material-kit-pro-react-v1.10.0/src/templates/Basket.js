import React, { Fragment } from "react";
import PropTypes from "prop-types";

// atoms
import BasketParallax from "atoms/Parallax/BasketParallax";
import { CentralWhitePage } from "atoms/Container";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import { Title } from "atoms/Title";

// organisms
import DeleteBasketModal from "organisms/DeleteBasketModal";
import ContainerWithZindex1 from "atoms/Container/ContainerWithZindex1";

export default function Basket({ children, deleteBasketModalProps }) {
  return (
    <Fragment>
      <BasketParallax />
      <CentralWhitePage>
        <ContainerWithZindex1>
          <Card plain>
            <CardBody plain>
              <Title size={3}>장바구니 목록</Title>
              {children}
            </CardBody>
          </Card>
        </ContainerWithZindex1>
      </CentralWhitePage>
      <DeleteBasketModal {...deleteBasketModalProps} />
    </Fragment>
  );
}

Basket.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  deleteBasketModalProps: PropTypes.shape({
    open: PropTypes.bool,
    onClose: PropTypes.func,
    yesNoButtonsProps: PropTypes.shape({
      onClickYesButton: PropTypes.func,
      onClickNoButton: PropTypes.func,
    }),
  }),
};
