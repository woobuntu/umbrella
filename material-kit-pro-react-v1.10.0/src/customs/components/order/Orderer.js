import React, { Fragment } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import PhoneNumber from "./PhoneNumber";
import { usePhoneNumber } from "hooks";
import PropTypes from "prop-types";

export default function Orderer({
  customInputPropsForName,
  phoneNumberProps,
  customInputPropsForEmail,
}) {
  return (
    <Fragment>
      <h3>주문자 정보</h3>
      <form>
        <CustomInput
          formControlProps={{
            fullWidth: true,
          }}
          {...customInputPropsForName}
        />
        <PhoneNumber {...phoneNumberProps} />
        <CustomInput {...customInputPropsForEmail} />
      </form>
    </Fragment>
  );
}

Orderer.propTypes = {
  customInputPropsForName: PropTypes.object,
  phoneNumberProps: PropTypes.object,
  customInputPropsForEmail: PropTypes.object,
};
