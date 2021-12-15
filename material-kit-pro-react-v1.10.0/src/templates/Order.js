import React, { Fragment } from "react";
import PropTypes from "prop-types";
import BasketParallax from "atoms/Parallax/BasketParallax";
import { CentralWhitePage } from "atoms/Container";

import Card from "components/Card/Card";

// styles
import CardBody from "components/Card/CardBody";
import { Title } from "atoms/Title";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import { OrdererInfoForm } from "organisms";
import { DeliveryInfoForm } from "organisms";
import PaymentInfoCard from "organisms/PaymentInfoCard";
import useMakePropsForOrder from "hooks/useMakePropsForOrder";
import ContainerWithZindex1 from "atoms/Container/ContainerWithZindex1";

export default function Order({
  products,
  userInfoFromServer,
  defaultDeliveryInfoFromServer,
  children,
}) {
  // orderer, delivery state는 이 레벨에서 관리
  // payment도 orderer, delivery에서 파생된 값이므로 역시 여기서 관리
  const { ordererInfoFormProps, deliveryInfoFormProps, paymentInfoCardProps } =
    useMakePropsForOrder({
      products,
      userInfoFromServer,
      defaultDeliveryInfoFromServer,
    });
  return (
    <Fragment>
      <BasketParallax />
      <CentralWhitePage>
        <ContainerWithZindex1>
          <Card plain>
            <CardBody plain>
              <Title size={3}>주문 목록</Title>
              {children}
              <GridContainer justify="space-between">
                <GridItem md={6} sm={6}>
                  <OrdererInfoForm {...ordererInfoFormProps} />
                  <DeliveryInfoForm {...deliveryInfoFormProps} />
                </GridItem>
                <GridItem md={4} sm={4}>
                  <PaymentInfoCard {...paymentInfoCardProps} />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </ContainerWithZindex1>
      </CentralWhitePage>
    </Fragment>
  );
}

Order.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ),
  userInfoFromServer: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  defaultDeliveryInfoFromServer: PropTypes.shape({
    name: PropTypes.string,
    phone: PropTypes.string,
    postCode: PropTypes.string,
    address: PropTypes.string,
    detailAddress: PropTypes.string,
    memo: PropTypes.string,
  }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
