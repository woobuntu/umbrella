import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React from "react";
import PhoneNumber from "../order/PhoneNumber";
import Button from "components/CustomButtons/Button";
import Address from "../order/Address";
import PropTypes from "prop-types";
import { useBasicDelivery } from "hooks";

export default function BasicDelivery({ profileData }) {
  const {
    customInputPropsForName,
    phoneNumberProps,
    addressProps,
    customInputPropsForMemo,
    editButtonProps,
  } = useBasicDelivery(profileData);
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="warning">
            <h4>기본 배송지 정보</h4>
            <p>입력된 정보는 상품 주문시 배송 정보의 기본값으로 설정됩니다</p>
          </CardHeader>
          <CardBody signup style={{ display: "flex", flexDirection: "column" }}>
            <CustomInput {...customInputPropsForName} />
            <PhoneNumber {...phoneNumberProps} />
            <Address {...addressProps} />
            <CustomInput {...customInputPropsForMemo} />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "flex-end",
                alignItems: "center",
                height: "5rem",
              }}
            >
              <Button style={{ width: "30%" }} {...editButtonProps}>
                {editButtonProps.text}
              </Button>
            </div>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

BasicDelivery.propTypes = {
  profileData: PropTypes.object,
};
