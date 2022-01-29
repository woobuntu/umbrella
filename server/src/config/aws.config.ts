import { registerAs } from '@nestjs/config';

export default registerAs('aws', () => ({
  region: process.env.REGION,
  bucket: process.env.BUCKET,
}));
