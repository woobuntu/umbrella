import { useEffect } from "react";

export default function useSetInitialDefaultDeliveryInfo({
  defaultDeliveryInfoFromServer,
  setName,
  phoneNumberDispatch,
  addressDispatch,
  setMemo,
}) {
  useEffect(() => {
    const { name, phone, postCode, address, detailAddress, memo } =
      defaultDeliveryInfoFromServer;
    const [firstNumber, secondNumber, thirdNumber] = phone.split("-");

    setName(name);
    phoneNumberDispatch({ type: "firstNumber", value: firstNumber });
    phoneNumberDispatch({ type: "secondNumber", value: secondNumber });
    phoneNumberDispatch({ type: "thirdNumber", value: thirdNumber });
    addressDispatch({ type: "postCode", value: postCode });
    addressDispatch({ type: "address", value: address });
    addressDispatch({ type: "detailAddress", value: detailAddress });
    setMemo(memo);
  }, [defaultDeliveryInfoFromServer]);
}
