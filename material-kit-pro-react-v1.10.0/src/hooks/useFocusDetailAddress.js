import { useRef, useEffect } from "react";

export default function useFocusDetailAddress(postCode) {
  const ref = useRef();

  const focusDetailAddress = () => ref.current.focus();

  useEffect(() => {
    if (postCode) focusDetailAddress();
  }, [postCode]);

  return { detailAddressRef: ref };
}
