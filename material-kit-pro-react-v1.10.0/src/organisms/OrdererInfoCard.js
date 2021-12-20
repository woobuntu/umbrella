import React, { Fragment } from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import WhiteCardTitle from "atoms/Title/WhiteCardTitle";
import SpaceBetween from "atoms/Container/SpaceBetween";

export default function OrdererInfoCard({ name, phone, email }) {
  return (
    <InfoCard
      cardColor="secondary"
      bodyContent={
        <Fragment>
          <WhiteCardTitle size={3}>주문자정보</WhiteCardTitle>
          <ul>
            <li>
              <SpaceBetween>
                <span>주문자</span>
                <span>{name}</span>
              </SpaceBetween>
            </li>
            <li>
              <SpaceBetween>
                <span>주문자 전화번호</span>
                <span>{phone}</span>
              </SpaceBetween>
            </li>
            <li>
              <SpaceBetween>
                <span>주문자 이메일</span>
                <span>{email}</span>
              </SpaceBetween>
            </li>
          </ul>
        </Fragment>
      }
    />
  );
}

OrdererInfoCard.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
};
