import React from "react";
import PropTypes from "prop-types";

import WhiteRoundButton from "./WhiteRoundButton";

export default function CreditCardButton({ onClick }) {
  return <WhiteRoundButton onClick={onClick}>신용카드</WhiteRoundButton>;
}

CreditCardButton.propTypes = {
  onClick: PropTypes.func,
};
