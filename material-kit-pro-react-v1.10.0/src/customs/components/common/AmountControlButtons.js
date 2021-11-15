import React from "react";
import Button from "components/CustomButtons/Button";
import { Add, Remove } from "@material-ui/icons";
import { amountControlButtonsStyle } from "customs/assets/styles/common";
import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";

const useStyles = makeStyles(amountControlButtonsStyle);

export default function AmountControlButtons({ onAdd, onRemove }) {
  const classes = useStyles();

  return (
    <div className={classes.buttonGroup}>
      <Button
        color="info"
        size="sm"
        round
        name="remove"
        className={classes.firstButton}
        onClick={onRemove}
      >
        <Remove />
      </Button>
      <Button
        color="info"
        size="sm"
        round
        name="add"
        className={classes.lastButton}
        onClick={onAdd}
      >
        <Add />
      </Button>
    </div>
  );
}

AmountControlButtons.propTypes = {
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
};
