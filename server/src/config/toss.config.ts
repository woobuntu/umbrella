import { registerAs } from '@nestjs/config';

export default registerAs('toss', () => ({
  clientSecret: process.env.TOSS_CLIENT_SECRET,
}));
