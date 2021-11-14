import { registerAs } from '@nestjs/config';

export default registerAs('kakao', () => ({
  clientId: process.env.KAKAO_CLIENT_ID,
}));
