// https://docs.nestjs.com/techniques/performance#performance-fastify
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { EnvironmentConfig } from './types/config';
import fastifyStatic from 'fastify-static';
import fastifySecureSession from 'fastify-secure-session';
import { join } from 'path';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions =
    process.env.NODE_ENV === 'development'
      ? null
      : {
          key: fs.readFileSync(process.env.KEY),
          cert: fs.readFileSync(process.env.CERT),
        };

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
      https: httpsOptions,
    }),
  );

  const configService = app.get(ConfigService);

  const { port, domain } = configService.get<EnvironmentConfig>('environment');

  app.register(fastifySecureSession, {
    cookieName: 'JSESSIONID',
    key: fs.readFileSync(join(__dirname, '../secret-key')),
    cookie: {
      path: '/',
      httpOnly: true,
      secure: true,
      domain,
    },
  });
  app.register(fastifyStatic, {
    root: join(__dirname, '..', '.well-known'),
  });

  await app.listen(port, '0.0.0.0');
  // fastify는 기본적으로 localhost 127.0.0.1 interface에서만 수신이 가능하다.
  // 다른 IPv4 interface에서도 수신할 수 있게 하기 위해 '0.0.0.0'을 listen메서드의 두 번째 인자로 전달해주는 것
}
bootstrap();
