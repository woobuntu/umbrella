import { useReducer } from "react";
import { phoneNumberReducer } from "reducers";

export default function usePhoneNumber() {
  const [state, dispatch] = useReducer(phoneNumberReducer, {
    first: "010",
    second: "",
    third: "",
  });

  const setFirstNumber = (e) =>
    dispatch({ type: "first", value: e.target.value });

  const setSecondNumber = (e) =>
    dispatch({ type: "second", value: e.target.value });

  const setThirdNumber = (e) =>
    dispatch({ type: "third", value: e.target.value });

  return {
    state,
    actions: {
      setFirstNumber,
      setSecondNumber,
      setThirdNumber,
    },
  };
}
