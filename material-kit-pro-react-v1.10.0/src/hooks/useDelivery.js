import { useReducer } from "react";
import { deliveryReducer } from "../reducers";
import usePhoneNumber from "./usePhoneNumber";
import useAddress from "./useAddress";

export default function useDelivery(submitted) {
  const phoneNumberProps = usePhoneNumber(submitted);

  const addressProps = useAddress(submitted);

  const [{ name, memo }, dispatch] = useReducer(deliveryReducer, {
    name: "",
    memo: "",
  });

  const setName = (e) => dispatch({ type: "name", value: e.target.value });
  const isNameNotValid = name.length < 2 ? true : false;
  const customInputPropsForName = {
    state: name,
    action: setName,
    error: submitted && isNameNotValid,
    labelText:
      submitted && isNameNotValid
        ? "최소 2자 이상의 이름을 입력해주세요"
        : "이름",
  };

  const setMemo = (e) => dispatch({ type: "memo", value: e.target.value });
  const customInputPropsForMemo = {
    state: memo,
    action: setMemo,
    formControlProps: {
      fullWidth: true,
    },
    labelText: "배송요청사항",
  };

  return {
    customInputPropsForName,
    phoneNumberProps,
    addressProps,
    customInputPropsForMemo,
    isDeliveryNotValid:
      isNameNotValid ||
      phoneNumberProps.isPhoneNumberNotValid ||
      addressProps.isAddressNotValid,
  };
}
