import React from "react";
import PropTypes from "prop-types";

import WhiteRoundButton from "./WhiteRoundButton";

export default function VirtualAccountButton({ onClick }) {
  return <WhiteRoundButton onClick={onClick}>가상계좌</WhiteRoundButton>;
}

VirtualAccountButton.propTypes = {
  onClick: PropTypes.func,
};
