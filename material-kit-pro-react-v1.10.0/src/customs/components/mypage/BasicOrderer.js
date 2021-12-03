import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React from "react";
import PhoneNumber from "../order/PhoneNumber";
import Button from "components/CustomButtons/Button";
import PropTypes from "prop-types";
import { useBasicProfile } from "hooks";

export default function BasicOrderer({ profileData }) {
  const {
    customInputPropsForName,
    phoneNumberProps,
    customInputPropsForEmail,
    editButtonProps,
  } = useBasicProfile(profileData);
  return (
    <GridContainer justify="center">
      <GridItem xs={12} sm={12} md={6}>
        <Card>
          <CardHeader color="success">
            <h4>회원정보</h4>
            <p>
              입력된 회원 정보는 상품 주문시 주문자 정보의 기본값으로 설정됩니다
            </p>
          </CardHeader>
          <CardBody signup style={{ display: "flex", flexDirection: "column" }}>
            <CustomInput {...customInputPropsForName} />
            <PhoneNumber {...phoneNumberProps} />
            <CustomInput {...customInputPropsForEmail} />
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

BasicOrderer.propTypes = {
  profileData: PropTypes.object,
};
