import usePhoneNumber from "./usePhoneNumber";
import { useReducer } from "react";
import { ordererReducer } from "reducers";

export default function useOrderer(submitted) {
  const phoneNumberProps = usePhoneNumber(submitted);

  const [{ name, email }, dispatch] = useReducer(ordererReducer, {
    name: "",
    email: "",
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
  };

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
