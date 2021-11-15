import React, { Fragment, useState } from "react";

import CustomInput from "components/CustomInput/CustomInput";
import PhoneNumber from "./PhoneNumber";
import { usePhoneNumber } from "hooks";

import Address from "./Address";

export default function Delivery() {
  const { state, actions } = usePhoneNumber();

  return (
    <Fragment>
      <h3>배송 정보</h3>
      <form>
        <CustomInput
          labelText="이름"
          formControlProps={{
            fullWidth: true,
          }}
        />
        <PhoneNumber state={state} actions={actions} />
        <Address />
        <CustomInput
          labelText="배송메모"
          formControlProps={{
            fullWidth: true,
          }}
        />
      </form>
    </Fragment>
  );
}
