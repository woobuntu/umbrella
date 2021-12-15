import { useReducer, useRef } from "react";
import { useState } from "react";
import { addressReducer } from "reducers";
import { phoneNumberReducer } from "reducers";
import useSetInitialDefaultDeliveryInfo from "./useSetInitialDefaultDeliveryInfo";

export default function useDeliveryInfoForm({
  isSubmitButtonClicked,
  defaultDeliveryInfoFromServer,
}) {
  const [name, setName] = useState("");
  const [{ firstNumber, secondNumber, thirdNumber }, phoneNumberDispatch] =
    useReducer(phoneNumberReducer, {
      firstNumber: "010",
      secondNumber: "",
      thirdNumber: "",
    });
  const [{ postCode, address, detailAddress }, addressDispatch] = useReducer(
    addressReducer,
    {
      postCode: "",
      address: "",
      detailAddress: "",
    }
  );
  const [memo, setMemo] = useState("");

  // 기본 배송지 정보로 초기값 세팅
  useSetInitialDefaultDeliveryInfo({
    defaultDeliveryInfoFromServer,
    setName,
    phoneNumberDispatch,
    addressDispatch,
    setMemo,
  });

  // making props
  const isNameValid = name.length > 1 ? true : false;
  const nameInputProps = {
    inputProps: {
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    error: isSubmitButtonClicked && !isNameValid,
  };

  const isSecondNumberValid = secondNumber.length > 3 ? true : false;
  const isThirdNumberValid = thirdNumber.length === 4 ? true : false;
  const phoneNumberFormProps = {
    customSelectPropsForFirstNumber: {
      value: firstNumber,
      onChange: (e) =>
        phoneNumberDispatch({ type: "firstNumber", value: e.target.value }),
    },
    customInputPropsForSecondNumber: {
      inputProps: {
        value: secondNumber,
        onChange: (e) =>
          phoneNumberDispatch({ type: "secondNumber", value: e.target.value }),
      },
      error: isSubmitButtonClicked && !isSecondNumberValid,
    },
    customInputPropsForThirdNumber: {
      inputProps: {
        value: thirdNumber,
        onChange: (e) =>
          phoneNumberDispatch({ type: "thirdNumber", value: e.target.value }),
      },
      error: isSubmitButtonClicked && !isThirdNumberValid,
    },
  };

  const detailAddressInputRef = useRef();
  const isPostCodeValid = postCode ? true : false;
  const isAddressValid = address ? true : false;
  const isDetailAddressValid = detailAddress ? true : false;
  const addressFormProps = {
    customInputPropsForPostCode: {
      inputProps: {
        value: postCode,
        onChange: (value) => addressDispatch({ type: "postCode", value }),
      },
      error: isSubmitButtonClicked && !isPostCodeValid,
    },
    onConfirm: ({ postCode, address }) => {
      addressDispatch({ type: "postCode", value: postCode });
      addressDispatch({ type: "address", value: address });
    },
    customInputPropsForAddress: {
      inputProps: {
        value: address,
        onChange: (value) => addressDispatch({ type: "address", value }),
      },
      error: isSubmitButtonClicked && !isAddressValid,
    },
    customInputPropsForDetailAddress: {
      inputProps: {
        value: detailAddress,
        onChange: (e) =>
          addressDispatch({ type: "detailAddress", value: e.target.value }),
        inputRef: detailAddressInputRef,
      },
      error: isSubmitButtonClicked && !isDetailAddressValid,
    },
  };

  const memoInputProps = {
    inputProps: {
      value: memo,
      onChange: (e) => setMemo(e.target.value),
    },
  };

  return {
    deliveryInfo: {
      name,
      phone: `${firstNumber}-${secondNumber}-${thirdNumber}`,
      postCode,
      address,
      detailAddress,
      memo,
    },
    deliveryInfoFormProps: {
      nameInputProps,
      phoneNumberFormProps,
      addressFormProps,
      memoInputProps,
    },
  };
}
