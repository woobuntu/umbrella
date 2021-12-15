import React from "react";
import PropTypes from "prop-types";

// atoms
import CustomInput from "components/CustomInput/CustomInput";

export default function NameInput({ inputProps, error }) {
  const labelText = error ? "최소 2자 이상의 이름을 입력해주세요" : "이름";
  return (
    <CustomInput
      labelText={labelText}
      // 추후 style을 className으로 변경 필요
      formControlProps={{
        style: {
          width: "50%",
        },
      }}
      inputProps={{
        id: "name",
        name: "name",
        autoComplete: "name",
        ...inputProps,
      }}
      error={error}
    />
  );
}

NameInput.defaultProps = {
  error: false,
};

NameInput.propTypes = {
  inputProps: PropTypes.shape({
    disabled: PropTypes.bool,
    inputRef: PropTypes.shape({
      current: PropTypes.shape({
        focus: PropTypes.func,
      }),
    }),
    value: PropTypes.string,
    onChange: PropTypes.func,
  }),
  error: PropTypes.bool,
};
