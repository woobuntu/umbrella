import React from "react";
import PropTypes from "prop-types";
import YesOrNoModal from "./YesOrNoModal";

export default function DeletePostModal(props) {
  return <YesOrNoModal content={<p>정말로 삭제하시겠습니까?</p>} {...props} />;
}

DeletePostModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  yesNoButtonsProps: PropTypes.shape({
    onClickYesButton: PropTypes.func,
    onClickNoButton: PropTypes.func,
  }),
};
