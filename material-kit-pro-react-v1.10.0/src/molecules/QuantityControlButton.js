import React from "react";
import PropTypes from "prop-types";

// icons
import { Add, Remove } from "@material-ui/icons";

// atoms
import Button from "components/CustomButtons/Button";

// styles
import { makeStyles } from "@material-ui/styles";
import buttonGroup from "assets/jss/material-kit-pro-react/buttonGroupStyle.js";
const useStyles = makeStyles({
  ...buttonGroup,
});

export default function QuantityControlButton({
  onClickDownButton,
  onClickUpButton,
}) {
  const classes = useStyles();

  return (
    <div className={classes.buttonGroup}>
      <Button
        color="info"
        size="sm"
        round
        className={classes.firstButton}
        onClick={onClickDownButton}
      >
        <Remove />
      </Button>
      <Button
        color="info"
        size="sm"
        round
        className={classes.lastButton}
        onClick={onClickUpButton}
      >
        <Add />
      </Button>
    </div>
  );
}

QuantityControlButton.defaultProps = {
  onClickDownButton: () => {},
  onClickUpButton: () => {},
};

QuantityControlButton.propTypes = {
  onClickDownButton: PropTypes.func,
  onClickUpButton: PropTypes.func,
};
