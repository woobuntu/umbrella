import React from "react";
import Button from "components/CustomButtons/Button";
import { KeyboardArrowRight } from "@material-ui/icons";
import PropTypes from "prop-types";

export default function PurchaseButton({ name }) {
  return (
    <Button color="info" round>
      {name}
      <KeyboardArrowRight />
    </Button>
  );
}

PurchaseButton.propTypes = {
  name: PropTypes.string,
};
