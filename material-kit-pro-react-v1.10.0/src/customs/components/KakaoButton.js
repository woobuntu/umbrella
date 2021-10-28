import React from "react";
import kakaoButtonUrl from "../../customs/assets/img/kakao_login_button.png";

export default function KakaoButton() {
  const kakakoClientId = encodeURIComponent("2cde7f3d11af1b03d63071887884c03f");
  const redirectUri = encodeURIComponent("http://localhost:3000");
  const kakaoLoginUrl =
    "https://kauth.kakao.com/oauth/authorize" +
    `?client_id=${kakakoClientId}` +
    `&redirect_uri=${redirectUri}` +
    "&response_type=code";

  return (
    <div style={{ width: "50%" }}>
      <a href={kakaoLoginUrl}>
        <img src={kakaoButtonUrl} style={{ width: "100%" }} />
      </a>
    </div>
  );
}
