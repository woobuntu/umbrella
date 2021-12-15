import React from "react";
import PropTypes from "prop-types";

// atoms
import { Tooltip } from "@material-ui/core";
import Button from "components/CustomButtons/Button";

// icons
import { Close } from "@material-ui/icons";

// styles
import { makeStyles } from "@material-ui/styles";
import tooltips from "assets/jss/material-kit-pro-react/tooltipsStyle.js";
const useStyles = makeStyles({
  ...tooltips,
  actionButton: {
    margin: "0px",
    padding: "5px",
  },
});

export default function RemoveProductButton({ onClick }) {
  const classes = useStyles();
  return (
    <Tooltip
      title="장바구니에서 제거하기"
      placement="left"
      classes={{ tooltip: classes.tooltip }}
    >
      <Button link className={classes.actionButton} onClick={onClick}>
        <Close />
      </Button>
    </Tooltip>
  );
}

RemoveProductButton.propTypes = {
  onClick: PropTypes.func,
};
