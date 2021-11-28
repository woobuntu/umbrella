import React from "react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import ItemPrice from "./ItemPrice";
import PropTypes from "prop-types";
import ItemAmount from "./ItemAmount";
import ItemRemove from "./ItemRemove";
import { mobileItemStyle } from "../../../assets/styles/basket/item";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles(mobileItemStyle);

export default function MobileItem({
  itemState,
  amountHandlers,
  removeHandlers,
}) {
  const { id, name, optionName, price, amount, file } = itemState;

  const classes = useStyles();
  return (
    <Card blog>
      <CardHeader image>
        <Link to={`/mall/${id}`}>
          <img src={file.path} />
        </Link>
        <div
          className={classes.coloredShadow}
          style={{
            backgroundImage: `url(${file.path})`,
            opacity: "1",
          }}
        />
      </CardHeader>
      <CardBody>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h6>{name}</h6>
            {removeHandlers && (
              <ItemRemove
                onButtonClick={removeHandlers.onButtonClick}
                onModalOk={removeHandlers.onModalOk}
              />
            )}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>옵션</span>
            <span>{optionName}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>수량</span>
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {amountHandlers ? (
                <ItemAmount
                  amount={amount}
                  onUp={amountHandlers.onUp}
                  onDown={amountHandlers.onDown}
                  onModalOk={amountHandlers.onModalOk}
                />
              ) : (
                amount
              )}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>총금액</span>
            <ItemPrice price={price * amount} />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

MobileItem.propTypes = {
  itemState: PropTypes.object,
  amountHandlers: PropTypes.objectOf(PropTypes.func),
  removeHandlers: PropTypes.objectOf(PropTypes.func),
};
