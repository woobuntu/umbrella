import { useEffect } from "react";

export default function useSetInitialUserInfo({
  userInfoFromServer,
  setName,
  dispatch,
  setEmail,
}) {
  useEffect(() => {
    const { name, phone, email } = userInfoFromServer;
    const [firstNumber, secondNumber, thirdNumber] = phone.split("-");

    setName(name);
    dispatch({ type: "firstNumber", value: firstNumber });
    dispatch({ type: "secondNumber", value: secondNumber });
    dispatch({ type: "thirdNumber", value: thirdNumber });
    setEmail(email);
  }, [userInfoFromServer]);
}
