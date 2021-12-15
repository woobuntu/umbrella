import { useState } from "react";

export default function useReceiverInfo() {
  const [name, setName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [memo, setMemo] = useState("");

  return {
    receiverInfoCardProps: {
      name,
      postCode,
      address,
      detailAddress,
      memo,
    },
    receiverInfoSetters: {
      setName,
      setPostCode,
      setAddress,
      setDetailAddress,
      setMemo,
    },
  };
}
