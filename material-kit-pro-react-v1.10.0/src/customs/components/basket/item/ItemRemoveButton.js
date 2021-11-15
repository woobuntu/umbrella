import React from "react";
import { Tooltip } from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import { itemRemoveButtonStyle } from "customs/assets/styles/basket/item";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(itemRemoveButtonStyle);

export default function ItemRemoveButton({ onClick }) {
  const classes = useStyles();

  return (
    <Tooltip
      title="장바구니에서 빼기"
      placement="left"
      classes={{ tooltip: classes.tooltip }}
    >
      <Button link className={classes.actionButton} onClick={onClick}>
        <Close />
      </Button>
    </Tooltip>
  );
}

ItemRemoveButton.propTypes = {
  onClick: PropTypes.func,
};
