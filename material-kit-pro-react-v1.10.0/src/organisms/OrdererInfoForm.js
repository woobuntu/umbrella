import React, { Fragment } from "react";
import PropTypes from "prop-types";

// molecules
import PhoneNumberForm from "molecules/PhoneNumberForm";

// atoms
import { NameInput } from "atoms/Form";
import { EmailInput } from "atoms/Form";
import { Title } from "atoms/Title";

export default function OrdererInfoForm({
  nameInputProps,
  phoneNumberFormProps,
  emailInputProps,
}) {
  return (
    <Fragment>
      <Title size={3}>주문자 정보</Title>
      <NameInput {...nameInputProps} />
      <PhoneNumberForm {...phoneNumberFormProps} />
      <EmailInput {...emailInputProps} />
    </Fragment>
  );
}

OrdererInfoForm.propTypes = {
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
  emailInputProps: PropTypes.shape({
    inputProps: PropTypes.shape({
      value: PropTypes.string,
      onChange: PropTypes.func,
    }),
  }),
};
