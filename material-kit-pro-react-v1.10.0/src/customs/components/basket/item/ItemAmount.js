import React from "react";
import PropTypes from "prop-types";
import { AmountControlButtons } from "customs/components/common";
import { Modal } from "customs/components/common";

export default function ItemAmount({ amount, onUp, onDown, onModalOk }) {
  return (
    <span>
      {amount} <AmountControlButtons onAdd={onUp} onRemove={onDown} />
      <Modal
        onOk={onModalOk}
        content={<p>해당 물품을 장바구니에서 제거하시겠습니까?</p>}
      />
    </span>
  );
}

ItemAmount.propTypes = {
  amount: PropTypes.number,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  onModalOk: PropTypes.func,
};
