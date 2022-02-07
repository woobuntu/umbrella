import React, { Fragment } from "react";
import GridContainer from "components/Grid/GridContainer";
import { basketButtonStyle } from "customs/assets/styles/product";
import { makeStyles } from "@material-ui/styles";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { Modal } from "../common";
import { useReactiveVar } from "@apollo/client";
import { isAuthenticatedVar } from "graphql/state";
import { isModalOpenVar } from "graphql/state";
import { useHistory } from "react-router";

const useStyles = makeStyles(basketButtonStyle);

export default function BasketButton({ onAddBasket, onModalOk }) {
  const classes = useStyles();

  const role = useReactiveVar(isAuthenticatedVar);

  const history = useHistory();

  const content =
    role !== "non-user" ? (
      <Fragment>
        {" "}
        <p>장바구니에 담았습니다</p>
        <p>장바구니로 이동하시겠습니까?</p>
      </Fragment>
    ) : (
      <Fragment>
        <p>로그인이 필요한 서비스입니다</p>
        <p>로그인하시겠습니까?</p>
      </Fragment>
    );

  return (
    <GridContainer className={classes.pullRight}>
      <Button round color="rose" onClick={onAddBasket}>
        장바구니에 담기 &nbsp; <ShoppingCart />
      </Button>
      <Modal content={content} onOk={onModalOk} />
    </GridContainer>
  );
}

BasketButton.propTypes = {
  onAddBasket: PropTypes.func,
  onModalOk: PropTypes.func,
};
