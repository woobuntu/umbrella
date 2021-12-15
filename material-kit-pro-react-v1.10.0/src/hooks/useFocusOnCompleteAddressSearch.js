import { useEffect, useRef } from "react";

export default function useFocusOnCompleteAddressSearch({
  isEditing,
  postCode,
  address,
}) {
  const ref = useRef();

  useEffect(() => {
    if (isEditing && postCode && address) {
      ref.current.focus();
    }
  }, [isEditing, postCode, address]);

  return ref;
}
