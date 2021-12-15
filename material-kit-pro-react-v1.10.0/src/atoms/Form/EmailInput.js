import React from "react";
import PropTypes from "prop-types";

// atoms
import CustomInput from "components/CustomInput/CustomInput";

export default function EmailInput({ inputProps, error }) {
  const labelText = error ? "이메일의 형식에 맞춰 입력해주세요" : "이메일";
  return (
    <CustomInput
      labelText={labelText}
      formControlProps={{
        fullWidth: true,
      }}
      inputProps={{
        id: "email",
        name: "email",
        autoComplete: "email",
        ...inputProps,
      }}
      error={error}
    />
  );
}

EmailInput.defaultProps = {
  error: false,
};

EmailInput.propTypes = {
  inputProps: PropTypes.shape({
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
  error: PropTypes.bool,
};
