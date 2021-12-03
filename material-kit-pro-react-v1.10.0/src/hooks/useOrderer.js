import usePhoneNumber from "./usePhoneNumber";
import { useEffect, useReducer } from "react";
import { ordererReducer } from "reducers";

export default function useOrderer({ submitted, profileData }) {
  const phoneNumberProps = usePhoneNumber({ submitted });

  const [{ name, email }, dispatch] = useReducer(ordererReducer, {
    name: "",
    email: "",
  });

  const setName = (e) => dispatch({ type: "name", value: e.target.value });
  const isNameNotValid = name && name.length < 2 ? true : false;
  const customInputPropsForName = {
    state: name,
    action: setName,
    error: submitted && isNameNotValid,
    labelText:
      submitted && isNameNotValid
        ? "최소 2자 이상의 이름을 입력해주세요"
        : "이름",
    inputProps: {
      id: "orderer-name",
      name: "ordererName",
      autoComplete: "orderer-name",
    },
  };

  const setEmail = (e) => dispatch({ type: "email", value: e.target.value });
  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isEmailNotValid = mailFormat.test(email) ? false : true;
  const customInputPropsForEmail = {
    state: email,
    action: setEmail,
    error: submitted && isEmailNotValid,
    labelText:
      submitted && isEmailNotValid
        ? "이메일의 형식에 맞춰 입력해주세요"
        : "이메일",
    formControlProps: {
      fullWidth: true,
    },
    inputProps: {
      id: "orderer-email",
      name: "ordererEmail",
      autoComplete: "orderer-email",
    },
  };

  useEffect(() => {
    if (profileData) {
      const { profile } = profileData;
      dispatch({ type: "name", value: profile.name || "" });
      const {
        customSelectPropsForFirstNumber: { action: setFirstNumber },
        customInputPropsForSecondNumber: { action: setSecondNumber },
        customInputPropsForThirdNumber: { action: setThirdNumber },
      } = phoneNumberProps;
      const [firstNumber, secondNumber, thirdNumber] = profile.phone.split("-");
      setFirstNumber({ target: { value: firstNumber } });
      setSecondNumber({ target: { value: secondNumber } });
      setThirdNumber({ target: { value: thirdNumber } });

      dispatch({ type: "email", value: profile.email });
    }
  }, [profileData]);

  return {
    customInputPropsForName,
    phoneNumberProps,
    customInputPropsForEmail,
    isOrdererNotValid:
      isNameNotValid ||
      phoneNumberProps.isPhoneNumberNotValid ||
      isEmailNotValid,
  };
}
