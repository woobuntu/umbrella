import React from "react";
import PropTypes from "prop-types";

// atoms
import CustomInput from "components/CustomInput/CustomInput";

export default function MemoInput({ inputProps }) {
  return (
    <CustomInput
      labelText="배송요청사항"
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        id: "memo",
        name: "memo",
        autoComplete: "memo",
        ...inputProps,
      }}
    />
  );
}

MemoInput.propTypes = {
  inputProps: PropTypes.shape({
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
};
