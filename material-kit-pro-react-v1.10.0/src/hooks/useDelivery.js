import { useEffect, useReducer } from "react";
import { deliveryReducer } from "../reducers";
import usePhoneNumber from "./usePhoneNumber";
import useAddress from "./useAddress";

export default function useDelivery({ submitted, profileData }) {
  const phoneNumberProps = usePhoneNumber({ submitted });

  const addressProps = useAddress({ submitted });

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
    inputProps: {
      id: "delivery-name",
      name: "deliveryName",
      autoComplete: "delivery-name",
    },
  };

  const setMemo = (e) => dispatch({ type: "memo", value: e.target.value });
  const customInputPropsForMemo = {
    state: memo,
    action: setMemo,
    formControlProps: {
      fullWidth: true,
    },
    labelText: "배송요청사항",
    inputProps: {
      id: "memo",
      name: "memo",
      autoComplete: "memo",
    },
  };

  useEffect(() => {
    if (profileData) {
      const {
        profile: { userDeliveryRelations },
      } = profileData;
      const [basicDelivery] = userDeliveryRelations
        .filter((userDeliveryRelation) => userDeliveryRelation.default)
        .map(({ delivery }) => delivery);

      dispatch({ type: "name", value: basicDelivery.name });
      const {
        customSelectPropsForFirstNumber: { action: setFirstNumber },
        customInputPropsForSecondNumber: { action: setSecondNumber },
        customInputPropsForThirdNumber: { action: setThirdNumber },
      } = phoneNumberProps;
      const [firstNumber, secondNumber, thirdNumber] =
        basicDelivery.phone.split("-");
      setFirstNumber({ target: { value: firstNumber } });
      setSecondNumber({ target: { value: secondNumber } });
      setThirdNumber({ target: { value: thirdNumber } });

      const {
        daumApiProps: { setPostCode, setAddress },
        customInputPropsForDetailAddress: { action: setDetailAddress },
      } = addressProps;
      const { postCode, address, detailAddress } = basicDelivery;
      setPostCode(postCode);
      setAddress(address);
      setDetailAddress({ target: { value: detailAddress } });

      dispatch({ type: "memo", value: basicDelivery.memo });
    }
  }, [profileData]);

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
