import React, { Fragment } from "react";

import Button from "components/CustomButtons/Button.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { isModalOpenVar } from "graphql/state";
import BaseModal from "./BaseModal";

export default function Modal({ onCancel, onOk, content }) {
  const onClose = () => isModalOpenVar(false);

  const buttons = (
    <Fragment>
      <Button onClick={onCancel(onClose)} color="secondary">
        취소
      </Button>
      <Link to="/basket">
        <Button color="primary" onClick={onOk(onClose)}>
          확인
        </Button>
      </Link>
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
