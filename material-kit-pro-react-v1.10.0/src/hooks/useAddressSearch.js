import { useEffect, useRef } from "react";

export default function useAddressSearch({ onConfirm, onClose }) {
  const containerRef = useRef();

  useEffect(() => {
    const { daum } = window;
    new daum.Postcode({
      oncomplete: ({
        userSelectedType,
        roadAddress,
        jibunAddress,
        bname,
        buildingName,
        apartment,
        zonecode,
      }) => {
        const address = userSelectedType ? roadAddress : jibunAddress;

        let extraAddress = "";
        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (bname !== "" && /[동|로|가]$/g.test(bname)) {
            extraAddress += bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (buildingName !== "" && apartment === "Y") {
            extraAddress +=
              extraAddress !== "" ? ", " + buildingName : buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddress !== "") {
            extraAddress = " (" + extraAddress + ")";
          }
        }

        // 이 두 함수를 비동기적으로 엮어야 되는 것인가
        onConfirm({
          postCode: zonecode,
          address: address + extraAddress,
        });
        onClose();
      },
      onresize: (size) => {
        containerRef.current.style.height = size.height + "px";
      },
      width: "100%",
      height: "100%",
    }).embed(containerRef.current);
  }, []);

  return containerRef;
}
