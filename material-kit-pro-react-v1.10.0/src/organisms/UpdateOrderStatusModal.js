import React, { Fragment, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import YesOrNoModal from "./YesOrNoModal";
import CustomInput from "components/CustomInput/CustomInput";

export default function UpdateOrderStatusModal(props) {
  const { targetStatus, inputProps, ...rest } = props;

  let targetWord;
  switch (targetStatus) {
    case "결제대기":
    case "결제완료":
    case "배송완료":
      targetWord = `${targetStatus}로`;
      break;
    default:
      targetWord = `${targetStatus}으로`;
  }

  const ref = useRef();

  useEffect(() => {
    if (targetStatus === "배송시작") {
      ref.current.focus();
    }
  });

  const content = (
    <Fragment>
      <p>주문 상태를 {targetWord} 변경하시겠습니까?</p>
      {targetStatus == "배송시작" && (
        <CustomInput
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            ...inputProps,
            placeholder: "운송장번호를 입력해주세요",
            inputRef: ref,
          }}
        />
      )}
    </Fragment>
  );
  return <YesOrNoModal content={content} {...rest} />;
}

UpdateOrderStatusModal.propTypes = {
  targetStatus: PropTypes.string,
  inputProps: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.bool,
  }),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  yesNoButtonsProps: PropTypes.shape({
    onClickYesButton: PropTypes.func,
    onClickNoButton: PropTypes.func,
  }),
};
