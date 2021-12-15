import React from "react";
import PropTypes from "prop-types";

// organisms
import BaseModal from "./BaseModal";
import YesNoButtons from "molecules/YesNoButtons";

export default function YesOrNoModal({ yesNoButtonsProps, ...rest }) {
  return (
    <BaseModal buttons={<YesNoButtons {...yesNoButtonsProps} />} {...rest} />
  );
}

YesOrNoModal.defaultProps = {
  yesNoButtonsProps: {
    onClickYesButton: () => {},
    onClickNoButton: () => {},
  },
};

YesOrNoModal.propTypes = {
  modalTitle: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  yesNoButtonsProps: PropTypes.shape({
    onClickYesButton: PropTypes.func,
    onClickNoButton: PropTypes.func,
  }),
};
