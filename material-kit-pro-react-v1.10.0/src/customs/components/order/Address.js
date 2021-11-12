import React, { Fragment, useState, useRef, useEffect } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import DaumApi from "./DaumApi";
import { useAddress } from "hooks";

export default function Address() {
  const [isDaumOpen, setIsDaumOpen] = useState(false);

  const openDaumApi = () => setIsDaumOpen(true);
  const closeDaumApi = () => setIsDaumOpen(false);

  const {
    state: { postCode, address, detailAddress },
    actions,
  } = useAddress();

  const ref = useRef();

  const focusDetailAddress = () => ref.current.focus();

  useEffect(() => {
    if (postCode) focusDetailAddress();
  }, [postCode]);

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomInput
          state={postCode}
          labelText="우편번호"
          inputProps={{
            disabled: true,
          }}
        />
        <Button
          color="success"
          style={{ marginLeft: "2rem" }}
          onClick={openDaumApi}
        >
          우편번호 찾기
        </Button>
      </div>
      {isDaumOpen && (
        <DaumApi closeDaumApi={closeDaumApi} addressControllers={actions} />
      )}
      <CustomInput
        state={address}
        labelText="주소"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          disabled: true,
        }}
      />
      <CustomInput
        state={detailAddress}
        labelText="상세주소"
        formControlProps={{
          fullWidth: true,
        }}
        inputProps={{
          inputRef: ref,
        }}
        action={actions.setDetailAddress}
      />
    </Fragment>
  );
}
