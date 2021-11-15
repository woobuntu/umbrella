import React from "react";
import PropTypes from "prop-types";
import { AmountControlButtons } from "customs/components/common";
import { Modal } from "customs/components/common";

export default function ItemAmount({ amount, onAdd, onRemove, onOk }) {
  return (
    <span>
      {amount} <AmountControlButtons onAdd={onAdd} onRemove={onRemove} />
      <Modal onOk={onOk}>
        <p>해당 물품을 장바구니에서 제거하시겠습니까?</p>
      </Modal>
    </span>
  );
}

ItemAmount.propTypes = {
  amount: PropTypes.number,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onOk: PropTypes.func,
};
