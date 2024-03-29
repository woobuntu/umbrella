import React from "react";
import { v4 } from "uuid";
import naverButtonUrl from "../../customs/assets/img/naver_login_button.png";

export default function NaverButton() {
  const naverClientId = encodeURIComponent(
    process.env.REACT_APP_NAVER_CLIENT_ID
  );
  const redirectUri = encodeURIComponent(
    process.env.REACT_APP_NAVER_REDIRECT_URI
  );
  const state = encodeURIComponent(v4()); // 전역관리하여 인증에 사용
  let naverLoginUrl =
    "https://nid.naver.com/oauth2.0/authorize" +
    "?response_type=code" +
    `&client_id=${naverClientId}` +
    `&redirect_uri=${redirectUri}` +
    `&state=${state}`;

  return (
    <div
      style={{
        padding: 0,
        marginBottom: "1rem",
        width: "201.781px",
        backgroundColor: "#03C75A",
        display: "flex",
        justifyContent: "center",
        borderRadius: "0.5rem",
      }}
    >
      <a href={naverLoginUrl}>
        <img src={naverButtonUrl} style={{ height: "38px" }} />
      </a>
    </div>
  );
}
