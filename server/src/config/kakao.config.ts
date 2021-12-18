import { registerAs } from '@nestjs/config';

export default registerAs('kakao', () => ({
  clientId: process.env.KAKAO_CLIENT_ID,
  redirectUri: process.env.KAKAO_REDIRECT_URI,
  cid: process.env.KAKAO_CID,
  adminKey: process.env.KAKAO_ADMIN_KEY,
}));
