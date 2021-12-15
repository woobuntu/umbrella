import { useEffect, useRef } from "react";

export default function useFocusOnClickEditButton({ isEditing }) {
  const ref = useRef();

  useEffect(() => {
    if (isEditing) ref.current.focus();
  }, [isEditing]);

  return ref;
}
