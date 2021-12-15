import React from "react";
import PropTypes from "prop-types";

// atoms
import Button from "components/CustomButtons/Button";

// styles
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  toss: {
    backgroundColor: "#3182f6",
    color: "white",
    fontWeight: "bold",
  },
});

export default function TossSimplePaymentButton({ onClick }) {
  const classes = useStyles();

  return (
    <Button round className={classes.toss} onClick={onClick}>
      토스 간편결제
    </Button>
  );
}

TossSimplePaymentButton.propTypes = {
  onClick: PropTypes.func,
};
