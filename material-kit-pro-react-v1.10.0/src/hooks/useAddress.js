import useFocusDetailAddress from "./useFocusDetailAddress";
import { useReducer, useState } from "react";
import { addressReducer } from "reducers";

export default function useAddress({ submitted = false, isEditing = true }) {
  const [{ postCode, address, detailAddress }, dispatch] = useReducer(
    addressReducer,
    {
      postCode: "",
      address: "",
      detailAddress: "",
    }
  );

  const isPostCodeNotValid = postCode === "" ? true : false;
  const customInputPropsForPostCode = {
    state: postCode,
    inputProps: {
      disabled: true,
      id: "post-code",
      name: "postCode",
      autoComplete: "post-code",
    },
    error: submitted && isPostCodeNotValid,
    labelText: "우편번호",
  };

  const isAddressNotValid = address === "" ? true : false;
  const customInputPropsForAddress = {
    state: address,
    formControlProps: {
      fullWidth: true,
    },
    inputProps: {
      disabled: true,
      id: "address",
      name: "address",
      autoComplete: "address",
    },
    error: submitted && isAddressNotValid,
    labelText:
      submitted && isAddressNotValid ? "우편번호 찾기를 실행해주세요" : "주소",
  };

  const isDetailAddressNotValid = detailAddress === "" ? true : false;
  const { detailAddressRef } = useFocusDetailAddress(postCode);
  const setDetailAddress = (e) =>
    dispatch({ type: "detailAddress", value: e.target.value });
  const customInputPropsForDetailAddress = {
    state: detailAddress,
    formControlProps: {
      fullWidth: true,
    },
    inputProps: {
      inputRef: detailAddressRef,
      disabled: isEditing ? false : true,
      id: "detail-address",
      name: "detailAddress",
      autoComplete: "detail-address",
    },
    action: setDetailAddress,
    error: submitted && isDetailAddressNotValid,
    labelText:
      submitted && isDetailAddressNotValid
        ? "상세주소를 입력해주세요"
        : "상세주소",
  };

  const [isDaumOpen, setIsDaumOpen] = useState(false);
  const openDaumApi = () => setIsDaumOpen(true);
  const buttonPropsForAddressSearch = {
    onClick: openDaumApi,
    disabled: isEditing ? false : true,
  };

  const closeDaumApi = () => setIsDaumOpen(false);
  const setPostCode = (value) => dispatch({ type: "postCode", value });
  const setAddress = (value) => dispatch({ type: "address", value });
  const daumApiProps = {
    closeDaumApi,
    setPostCode,
    setAddress,
  };

  return {
    customInputPropsForPostCode,
    customInputPropsForAddress,
    customInputPropsForDetailAddress,
    buttonPropsForAddressSearch,
    daumApiProps,
    isDaumOpen,
    isAddressNotValid:
      isPostCodeNotValid || isAddressNotValid || isDetailAddressNotValid,
  };
}
