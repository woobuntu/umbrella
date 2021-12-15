import React from "react";
import PropTypes from "prop-types";

// atoms
import Button from "components/CustomButtons/Button";

// icons
import { KeyboardArrowRight } from "@material-ui/icons";

export default function PurchaseButton({ onClick }) {
  return (
    <Button color="info" round onClick={onClick}>
      주문하기
      <KeyboardArrowRight />
    </Button>
  );
}

PurchaseButton.propTypes = {
  onClick: PropTypes.func,
};
