import React from "react";
import kakaoButtonUrl from "../../customs/assets/img/kakao_login_button.png";
import { v4 } from "uuid";
import PropTypes from "prop-types";

export default function KakaoButton({ disabled }) {
  const kakakoClientId = encodeURIComponent(
    process.env.REACT_APP_KAKAO_CLIENT_ID
  );
  const redirectUri = encodeURIComponent(
    process.env.REACT_APP_KAKAO_REDIRECT_URI
  );
  const state = encodeURIComponent(v4()); // 전역관리하여 인증에 사용
  const kakaoLoginUrl =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${kakakoClientId}` +
    `&redirect_uri=${redirectUri}` +
    `&state=${state}` +
    "&response_type=code";

  return (
    <div
      style={{
        padding: 0,
        marginBottom: "1rem",
        width: "201.781px",
        backgroundColor: "#FEE500",
        display: "flex",
        justifyContent: "center",
        borderRadius: "0.5rem",
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <a
        href={disabled ? "#" : kakaoLoginUrl}
        style={{ cursor: disabled ? "default" : "pointer" }}
      >
        <img src={kakaoButtonUrl} style={{ height: "38px" }} />
      </a>
    </div>
  );
}

KakaoButton.propTypes = {
  disabled: PropTypes.bool,
};
