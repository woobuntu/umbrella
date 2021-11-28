import { useReducer } from "react";
import { phoneNumberReducer } from "reducers";

export default function usePhoneNumber(submitted) {
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
  };

  const setSecondNumber = (e) =>
    dispatch({ type: "second", value: e.target.value });
  const isSecondNumberNotValid = second.length < 3 ? true : false;
  const customInputPropsForSecondNumber = {
    state: second,
    action: setSecondNumber,
    error: submitted && isSecondNumberNotValid,
    labelText: "(X)XXX",
  };

  const setThirdNumber = (e) =>
    dispatch({ type: "third", value: e.target.value });
  const isThirdNumberNotValid = third.length < 4 ? true : false;
  const customInputPropsForThirdNumber = {
    state: third,
    action: setThirdNumber,
    error: submitted && isThirdNumberNotValid,
    labelText: "XXXX",
  };

  return {
    customSelectPropsForFirstNumber,
    customInputPropsForSecondNumber,
    customInputPropsForThirdNumber,
    isPhoneNumberNotValid: isSecondNumberNotValid || isThirdNumberNotValid,
  };
}
