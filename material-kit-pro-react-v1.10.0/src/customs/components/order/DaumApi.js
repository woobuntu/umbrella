import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";

export default function DaumApi({ closeDaumApi, setPostCode, setAddress }) {
  const ref = useRef();

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
        setPostCode(zonecode);
        setAddress(address + extraAddress);
        closeDaumApi();
      },
      onresize: (size) => {
        ref.current.style.height = size.height + "px";
      },
      width: "100%",
      height: "100%",
    }).embed(ref.current);
  }, []);

  return (
    <div
      style={{
        border: "1px solid",
        margin: "1rem 0",
        position: "relative",
      }}
      ref={ref}
    >
      <img
        src="//t1.daumcdn.net/postcode/resource/images/close.png"
        id="btnFoldWrap"
        style={{
          cursor: "pointer",
          position: "absolute",
          right: "0px",
          top: "-1px",
          zIndex: 1,
        }}
        onClick={closeDaumApi}
        alt="접기 버튼"
      />
    </div>
  );
}

DaumApi.propTypes = {
  closeDaumApi: PropTypes.func,
  setPostCode: PropTypes.func,
  setAddress: PropTypes.func,
};
