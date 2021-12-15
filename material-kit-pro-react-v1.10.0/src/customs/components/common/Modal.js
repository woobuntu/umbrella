import React, { Fragment } from "react";

import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";

import { isModalOpenVar } from "graphql/state";
import BaseModal from "./BaseModal";

export default function Modal({ onCancel, onOk, content }) {
  const onClose = () => isModalOpenVar(false);

  const buttons = (
    <Fragment>
      <Button onClick={onCancel(onClose)} color="secondary">
        취소
      </Button>
      <Button
        color="primary"
        onClick={() => {
          // onOk가 비동기 함수일 수 있으니 이후 rxjs로 wrapup할 예정
          onOk();
          onClose();
        }}
      >
        확인
      </Button>
    </Fragment>
  );

  return <BaseModal content={content} buttons={buttons} />;
}
Modal.defaultProps = {
  onOk: (onClose) => () => onClose(),
  onCancel: (onClose) => () => onClose(),
};

Modal.propTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
