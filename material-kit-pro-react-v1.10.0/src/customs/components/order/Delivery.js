import React, { Fragment } from "react";

import CustomInput from "components/CustomInput/CustomInput";
import PhoneNumber from "./PhoneNumber";
import PropTypes from "prop-types";

import Address from "./Address";

export default function Delivery({
  customInputPropsForName,
  phoneNumberProps,
  addressProps,
  customInputPropsForMemo,
}) {
  return (
    <Fragment>
      <h3>배송 정보</h3>
      <form>
        <CustomInput
          formControlProps={{
            fullWidth: true,
          }}
          {...customInputPropsForName}
        />
        <PhoneNumber {...phoneNumberProps} />
        <Address {...addressProps} />
        <CustomInput {...customInputPropsForMemo} />
      </form>
    </Fragment>
  );
}

Delivery.propTypes = {
  customInputPropsForName: PropTypes.object,
  phoneNumberProps: PropTypes.object,
  addressProps: PropTypes.object,
  customInputPropsForMemo: PropTypes.object,
};
