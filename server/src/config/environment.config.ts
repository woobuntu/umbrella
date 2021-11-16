import { registerAs } from '@nestjs/config';

export default registerAs('environment', () => ({
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
}));
