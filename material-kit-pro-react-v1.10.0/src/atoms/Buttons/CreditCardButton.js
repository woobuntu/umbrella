import React from "react";
import PropTypes from "prop-types";

import WhiteRoundButton from "./WhiteRoundButton";

export default function CreditCardButton({ onClick, name }) {
  return (
    <WhiteRoundButton onClick={onClick}>
      신용카드{name && ` - ${name}`}
    </WhiteRoundButton>
  );
}

CreditCardButton.propTypes = {
  name: PropTypes.string,
  onClick: PropTypes.func,
};
