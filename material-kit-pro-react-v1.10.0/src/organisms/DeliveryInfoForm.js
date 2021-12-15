import React, { Fragment } from "react";
import PropTypes from "prop-types";

// atoms
import { NameInput } from "atoms/Form";
import MemoInput from "atoms/Form/MemoInput";
import { Title } from "atoms/Title";

// molecules
import PhoneNumberForm from "molecules/PhoneNumberForm";
import { AddressForm } from "molecules";

export default function DeliveryInfoForm({
  nameInputProps,
  phoneNumberFormProps,
  addressFormProps,
  memoInputProps,
}) {
  return (
    <Fragment>
      <Title size={3}>배송 정보</Title>
      <NameInput {...nameInputProps} />
      <PhoneNumberForm {...phoneNumberFormProps} />
      <AddressForm {...addressFormProps} />
      <MemoInput {...memoInputProps} />
    </Fragment>
  );
}

DeliveryInfoForm.propTypes = {
  nameInputProps: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
  }),
  phoneNumberFormProps: PropTypes.shape({
    customSelectPropsForFirstNumber: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
    customInputPropsForSecondNumber: PropTypes.shape({
      inputProps: PropTypes.shape({
        value: PropTypes.string,
        onChange: PropTypes.func,
      }),
      error: PropTypes.bool,
    }),
    customInputPropsForThirdNumber: PropTypes.shape({
      inputProps: PropTypes.shape({
        value: PropTypes.string,
        onChange: PropTypes.func,
      }),
      error: PropTypes.bool,
    }),
  }),
  addressFormProps: PropTypes.shape({
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
        inputRef: PropTypes.any,
      }),
      error: PropTypes.bool,
    }),
  }),
  memoInputProps: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
  }),
};
