import React, { Fragment, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import YesOrNoModal from "./YesOrNoModal";
import CustomInput from "components/CustomInput/CustomInput";

export default function CancelOrderModal({ inputProps, ...rest }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);
  return (
    <YesOrNoModal
      content={
        <Fragment>
          <p>주문을 취소하시겠습니까?</p>
          <CustomInput
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              ...inputProps,
              placeholder: "취소사유를 입력해주세요",
              inputRef: ref,
            }}
          />
        </Fragment>
      }
      {...rest}
    />
  );
}

CancelOrderModal.propTypes = {
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
