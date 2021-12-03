import { useReducer } from "react";
import { phoneNumberReducer } from "reducers";

export default function usePhoneNumber({
  submitted = false,
  isEditing = true,
}) {
  const [{ first, second, third }, dispatch] = useReducer(phoneNumberReducer, {
    first: "010",
    second: "",
    third: "",
  });

  const setFirstNumber = (e) =>
    dispatch({ type: "first", value: e.target.value });
  const customSelectPropsForFirstNumber = {
    options: ["010", "011", "016", "017", "019"],
    state: first,
    action: setFirstNumber,
    disabled: isEditing ? false : true,
    inputProps: {
      id: "first-number",
      name: "firstNumber",
      autoComplete: "first-number",
    },
  };

  const setSecondNumber = (e) =>
    dispatch({ type: "second", value: e.target.value });
  const isSecondNumberNotValid = second.length < 3 ? true : false;
  const customInputPropsForSecondNumber = {
    state: second,
    action: setSecondNumber,
    error: submitted && isSecondNumberNotValid,
    labelText: "(X)XXX",
    inputProps: {
      disabled: isEditing ? false : true,
      id: "second-number",
      name: "secondNumber",
      autoComplete: "second-number",
    },
  };

  const setThirdNumber = (e) =>
    dispatch({ type: "third", value: e.target.value });
  const isThirdNumberNotValid = third.length < 4 ? true : false;
  const customInputPropsForThirdNumber = {
    state: third,
    action: setThirdNumber,
    error: submitted && isThirdNumberNotValid,
    labelText: "XXXX",
    inputProps: {
      disabled: isEditing ? false : true,
      id: "third-number",
      name: "thirdNumber",
      autoComplete: "third-number",
    },
  };

  return {
    customSelectPropsForFirstNumber,
    customInputPropsForSecondNumber,
    customInputPropsForThirdNumber,
    isPhoneNumberNotValid: isSecondNumberNotValid || isThirdNumberNotValid,
  };
}
