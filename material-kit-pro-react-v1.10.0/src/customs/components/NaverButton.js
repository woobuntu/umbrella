import React from "react";
import { v4 } from "uuid";
import naverButtonUrl from "../../customs/assets/img/naver_login_button.png";

export default function NaverButton() {
  const naverClientId = encodeURIComponent("gbanzvwb6EnLxcrgDyqx");
  const redirectUri = encodeURIComponent("http://localhost:3000");
  const state = encodeURIComponent(v4());
  const naverLoginUrl =
    "https://nid.naver.com/oauth2.0/authorize" +
    "?response_type=code" +
    `&client_id=${naverClientId}` +
    `&redirect_uri=${redirectUri}` +
    `&state=${state}`;

  return (
    <div style={{ width: "50%", marginBottom: "1rem" }}>
      <a href={naverLoginUrl}>
        <img src={naverButtonUrl} style={{ width: "100%" }} />
      </a>
    </div>
  );
}
