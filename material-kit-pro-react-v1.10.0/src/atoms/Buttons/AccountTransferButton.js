import React from "react";
import PropTypes from "prop-types";

// atoms
import WhiteRoundButton from "./WhiteRoundButton";

export default function AccountTransferButton({ onClick }) {
  return <WhiteRoundButton onClick={onClick}>계좌이체</WhiteRoundButton>;
}

AccountTransferButton.propTypes = {
  onClick: PropTypes.func,
};
