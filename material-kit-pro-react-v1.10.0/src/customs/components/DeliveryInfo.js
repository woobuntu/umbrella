import { makeStyles } from "@material-ui/styles";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import React from "react";
import PropTypes from "prop-types";
import { description } from "assets/jss/material-kit-pro-react.js";

const style = {
  cardCategory: {
    ...description,
  },
  marginBottom30: {
    marginBottom: "30px",
  },
};

const useStyles = makeStyles(style);

export default function DeliveryInfo({
  delivery = {
    name: "",
    phone: "",
    postCode: "",
    address: "",
    detailAddress: "",
    memo: "",
  },
}) {
  const { name, phone, postCode, address, detailAddress, memo } = delivery;
  const classes = useStyles();
  return (
    <Card pricing color="success">
      <CardBody pricing>
        <h3
          style={{ color: "white" }}
          className={classes.cardCategory + " " + classes.marginBottom30}
        >
          배송정보
        </h3>
        <ul>
          <li>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>받는사람</span>
              <span>
                <b>{name}</b>
              </span>
            </div>
          </li>
          <li>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>연락처</span>
              <span>
                <b>{phone}</b>
              </span>
            </div>
          </li>
          <li>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ width: "100%", textAlign: "start" }}>받는주소</p>
              <p style={{ width: "100%", textAlign: "start" }}>
                <b>{`(${postCode}) ${address} - ${detailAddress}`}</b>
              </p>
            </div>
          </li>
          <li>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p style={{ width: "100%", textAlign: "start" }}>배송요청사항</p>
              <p style={{ width: "100%", textAlign: "start" }}>
                <b>{memo}</b>
              </p>
            </div>
          </li>
        </ul>
      </CardBody>
    </Card>
  );
}

DeliveryInfo.propTypes = {
  delivery: PropTypes.object,
};
