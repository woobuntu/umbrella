import { useReducer } from "react";
import { addressReducer } from "reducers";

export default function useAddress() {
  const [state, dispatch] = useReducer(addressReducer, {
    postCode: "",
    address: "",
    detailAddress: "",
  });

  const setPostCode = (value) => dispatch({ type: "postCode", value });

  const setAddress = (value) => dispatch({ type: "address", value });

  const setDetailAddress = (e) =>
    dispatch({ type: "detailAddress", value: e.target.value });

  return {
    state,
    actions: {
      setPostCode,
      setAddress,
      setDetailAddress,
    },
  };
}
