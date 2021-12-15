import { useState } from "react";

export default function usePhoneNumber() {
  const [firstNumber, setFirstNumber] = useState("010");
  const [secondNumber, setSecondNumber] = useState("");
  const [thirdNumber, setThirdNumber] = useState("");

  const phoneNumberFormProps = {
    customSelectPropsForFirstNumber: {
      value: firstNumber,
      onChange: (e) => setFirstNumber(e.target.value),
    },
    customInputPropsForSecondNumber: {
      inputProps: {
        value: secondNumber,
        onChange: (e) => setSecondNumber(e.target.value),
      },
    },
    customInputPropsForThirdNumber: {
      inputProps: {
        value: thirdNumber,
        onChange: (e) => setThirdNumber(e.target.value),
      },
    },
  };

  return phoneNumberFormProps;
}
