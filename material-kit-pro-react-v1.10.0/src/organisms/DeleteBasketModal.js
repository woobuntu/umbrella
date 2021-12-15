import React from "react";
import PropTypes from "prop-types";
import YesOrNoModal from "./YesOrNoModal";

export default function DeleteBasketModal(props) {
  return (
    <YesOrNoModal
      content={<p>해당 상품을 장바구니에서 제거하시겠습니까?</p>}
      {...props}
    />
  );
}

DeleteBasketModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  yesNoButtonsProps: PropTypes.shape({
    onClickYesButton: PropTypes.func,
    onClickNoButton: PropTypes.func,
  }),
};
