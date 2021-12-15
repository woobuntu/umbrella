import { useReducer, useState } from "react";
import { phoneNumberReducer } from "reducers";
import useSetInitialUserInfo from "./useSetInitialUserInfo";

export default function useOrdererInfoForm({
  isSubmitButtonClicked,
  userInfoFromServer,
}) {
  // state 및 handler 생성
  const [name, setName] = useState("");
  const [{ firstNumber, secondNumber, thirdNumber }, dispatch] = useReducer(
    phoneNumberReducer,
    {
      firstNumber: "010",
      secondNumber: "",
      thirdNumber: "",
    }
  );
  const [email, setEmail] = useState("");

  // 회원정보로 초기값 세팅
  useSetInitialUserInfo({
    userInfoFromServer,
    setName,
    dispatch,
    setEmail,
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
      onChange: (e) => dispatch({ type: "firstNumber", value: e.target.value }),
    },
    customInputPropsForSecondNumber: {
      inputProps: {
        value: secondNumber,
        onChange: (e) =>
          dispatch({ type: "secondNumber", value: e.target.value }),
      },
      error: isSubmitButtonClicked && !isSecondNumberValid,
    },
    customInputPropsForThirdNumber: {
      inputProps: {
        value: thirdNumber,
        onChange: (e) =>
          dispatch({ type: "thirdNumber", value: e.target.value }),
      },
      error: isSubmitButtonClicked && !isThirdNumberValid,
    },
  };

  const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const isEmailValid = mailFormat.test(email) ? true : false;
  const emailInputProps = {
    inputProps: {
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    error: isSubmitButtonClicked && !isEmailValid,
  };

  return {
    ordererInfo: {
      name,
      phone: `${firstNumber}-${secondNumber}-${thirdNumber}`,
      email,
    },
    ordererInfoFormProps: {
      nameInputProps,
      phoneNumberFormProps,
      emailInputProps,
    },
  };
}
