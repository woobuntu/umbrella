import React from "react";
import Button from "components/CustomButtons/Button";
import { KeyboardArrowRight } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function PurchaseButton({ name, onClick }) {
  return (
    <Button color="info" round onClick={onClick}>
      {name}
      <KeyboardArrowRight />
    </Button>
  );
}

PurchaseButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};
