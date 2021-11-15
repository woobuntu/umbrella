import React, { Fragment } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import PhoneNumber from "./PhoneNumber";
import { usePhoneNumber } from "hooks";

export default function Orderer() {
  const { state, actions } = usePhoneNumber();

  return (
    <Fragment>
      <h3>주문자 정보</h3>
      <form>
        <CustomInput
          labelText="이름"
          formControlProps={{
            fullWidth: true,
          }}
        />
        {/* 비회원일 경우 결제 비밀번호도 추가 필요할 듯 */}
        <PhoneNumber state={state} actions={actions} />
        <CustomInput
          labelText="이메일"
          formControlProps={{
            fullWidth: true,
          }}
        />
      </form>
    </Fragment>
  );
}
