import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

// atoms
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import { FlexRow } from "atoms/Container";

// molecules
import AddressSearch from "./AddressSearch";

export default function AddressForm({
  disabled,
  customInputPropsForPostCode,
  onConfirm,
  customInputPropsForAddress,
  customInputPropsForDetailAddress,
}) {
  const [isAddressSearching, setIsAddressSearching] = useState(false);
  const onAddressSearch = () => setIsAddressSearching(true);
  const closeAddressSearch = () => setIsAddressSearching(false);

  const addressLabelText = customInputPropsForAddress.error
    ? "우편번호 찾기를 실행해주세요"
    : "주소";
  const detailAddressLabelText = customInputPropsForDetailAddress.error
    ? "상세주소를 입력해주세요"
    : "상세주소";
  return (
    <Fragment>
      {/* FlexRow는 추후 Grid 조합으로 바꿔보자 */}
      <FlexRow>
        <CustomInput
          labelText="우편번호"
          inputProps={{
            disabled: true,
            id: "post-code",
            name: "postCode",
            autoComplete: "post-code",
            ...customInputPropsForPostCode.inputProps,
          }}
          error={customInputPropsForPostCode.error}
        />
        <Button
          color="success"
          style={{ marginLeft: "2rem" }}
          onClick={onAddressSearch}
          disabled={disabled}
        >
          우편번호 찾기
        </Button>
      </FlexRow>
      {isAddressSearching && (
        <AddressSearch onClose={closeAddressSearch} onConfirm={onConfirm} />
      )}
      <CustomInput
        labelText={addressLabelText}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          disabled: true,
          id: "address",
          name: "address",
          autoComplete: "address",
          ...customInputPropsForAddress.inputProps,
        }}
        error={customInputPropsForAddress.error}
      />
      <CustomInput
        labelText={detailAddressLabelText}
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          id: "detail-address",
          name: "detailAddress",
          autoComplete: "street-address",
          ...customInputPropsForDetailAddress.inputProps,
        }}
        error={customInputPropsForDetailAddress.error}
      />
    </Fragment>
  );
}

AddressForm.defaultProps = {
  disabled: false,
  customInputPropsForPostCode: {
    error: false,
    inputProps: {
      value: "",
      onChange: () => {},
    },
  },
  customInputPropsForAddress: {
    error: false,
    inputProps: {
      value: "",
      onChange: () => {},
    },
  },
  customInputPropsForDetailAddress: {
    error: false,
    inputProps: {
      value: "",
      onChange: () => {},
      inputRef: null,
    },
  },
};

AddressForm.propTypes = {
  disabled: PropTypes.bool,
  customInputPropsForPostCode: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    error: PropTypes.bool,
  }),
  onConfirm: PropTypes.func,
  customInputPropsForAddress: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    error: PropTypes.bool,
  }),
  customInputPropsForDetailAddress: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
      inputRef: PropTypes.any, // 확인 필요
    }),
    error: PropTypes.bool,
  }),
};
