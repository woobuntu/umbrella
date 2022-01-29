import { registerAs } from '@nestjs/config';

export default registerAs('environment', () => ({
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  clientUrl: process.env.CLIENT_URL,
  domain: process.env.DOMAIN,
  expires: process.env.EXPIRES,
  region: process.env.REGION,
}));
