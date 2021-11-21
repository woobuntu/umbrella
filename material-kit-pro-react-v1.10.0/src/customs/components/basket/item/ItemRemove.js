import React, { Fragment } from "react";
import ItemRemoveButton from "./ItemRemoveButton";
import { Modal } from "customs/components/common";
import PropTypes from "prop-types";

export default function ItemRemove({ onButtonClick, onModalOk }) {
  return (
    <Fragment>
      <ItemRemoveButton onClick={onButtonClick} />
      <Modal
        onOk={onModalOk}
        content={<p>해당 물품을 장바구니에서 제거하시겠습니까?</p>}
      />
    </Fragment>
  );
}

ItemRemove.propTypes = {
  onButtonClick: PropTypes.func,
  onModalOk: PropTypes.func,
};
