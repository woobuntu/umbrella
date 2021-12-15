import React, { Fragment } from "react";
import PropTypes from "prop-types";
import InfoCard from "./InfoCard";
import { CardTitle } from "atoms/Title";
import SpaceBetween from "atoms/Container/SpaceBetween";
import WhiteCardTitle from "atoms/Title/WhiteCardTitle";
import FlexColumn from "atoms/Container/FlexColumn";

export default function ReceiverInfoCard({
  name,
  postCode,
  address,
  detailAddress,
  memo,
}) {
  return (
    <InfoCard
      cardColor="success"
      bodyContent={
        <Fragment>
          <WhiteCardTitle size={3}>배송정보</WhiteCardTitle>
          <ul>
            <li>
              <SpaceBetween>
                <span>받는 사람</span>
                <span>{name}</span>
              </SpaceBetween>
            </li>
            <li>
              <FlexColumn>
                <p>받는 주소</p>
                <p style={{ textAlign: "start" }}>
                  {postCode &&
                    address &&
                    detailAddress &&
                    `(${postCode}) ${address} ${detailAddress}`}
                </p>
              </FlexColumn>
            </li>
            <li>
              <FlexColumn>
                <p>배송요청사항</p>
                <p style={{ textAlign: "start" }}>{memo}</p>
              </FlexColumn>
            </li>
          </ul>
        </Fragment>
      }
    />
  );
}

ReceiverInfoCard.propTypes = {
  name: PropTypes.string,
  postCode: PropTypes.string,
  address: PropTypes.string,
  detailAddress: PropTypes.string,
  memo: PropTypes.string,
};
