import React, { Fragment } from "react";
import GridContainer from "components/Grid/GridContainer";
import { basketButtonStyle } from "customs/assets/styles/product";
import { makeStyles } from "@material-ui/styles";
import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { Modal } from "../common";

const useStyles = makeStyles(basketButtonStyle);

export default function BasketButton({ onAdd }) {
  const classes = useStyles();

  return (
    <GridContainer className={classes.pullRight}>
      <Button round color="rose" onClick={onAdd}>
        장바구니에 담기 &nbsp; <ShoppingCart />
      </Button>
      <Modal
        content={
          <Fragment>
            <p>장바구니에 담았습니다.</p>
            <p>장바구니로 이동하시겠습니까?</p>
          </Fragment>
        }
      />
    </GridContainer>
  );
}

BasketButton.propTypes = {
  onAdd: PropTypes.func,
};
