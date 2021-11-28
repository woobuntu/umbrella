import React, { Fragment, useRef, useEffect } from "react";
import CustomInput from "components/CustomInput/CustomInput";
import Button from "components/CustomButtons/Button";
import DaumApi from "./DaumApi";
import PropTypes from "prop-types";
import { useDaumApi, useFocusDetailAddress } from "hooks";

export default function Address({
  customInputPropsForPostCode,
  customInputPropsForAddress,
  customInputPropsForDetailAddress,
  buttonPropsForAddressSearch,
  daumApiProps,
  isDaumOpen,
}) {
  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomInput {...customInputPropsForPostCode} />
        <Button
          color="success"
          style={{ marginLeft: "2rem" }}
          {...buttonPropsForAddressSearch}
        >
          우편번호 찾기
        </Button>
      </div>
      {isDaumOpen && <DaumApi {...daumApiProps} />}
      <CustomInput {...customInputPropsForAddress} />
      <CustomInput {...customInputPropsForDetailAddress} />
    </Fragment>
  );
}

Address.propTypes = {
  customInputPropsForPostCode: PropTypes.object,
  customInputPropsForAddress: PropTypes.object,
  customInputPropsForDetailAddress: PropTypes.object,
  buttonPropsForAddressSearch: PropTypes.object,
  daumApiProps: PropTypes.object,
  isDaumOpen: PropTypes.bool,
};
