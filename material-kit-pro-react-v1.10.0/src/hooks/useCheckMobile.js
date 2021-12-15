import { useEffect } from "react";
import { useState } from "react";
import getIsMobile from "utils/getIsMobile";

export default function useCheckMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(getIsMobile());
  }, [navigator.userAgent, navigator.vendor, window.opera]);

  return isMobile;
}
