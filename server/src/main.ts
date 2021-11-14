// https://docs.nestjs.com/techniques/performance#performance-fastify
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import fastifyCookie from 'fastify-cookie';
import fastifySession from '@fastify/session';
import { EnvironmentConfig, SessionConfig } from './types/config';
import fastifyStatic from 'fastify-static';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false,
    }),
  );

  const configService = app.get(ConfigService);

  const { secret } = configService.get<SessionConfig>('session');

  app.register(fastifyCookie);
  app.register(fastifySession, {
    cookieName: 'sessionId', // default로 sessionId지만, 명시적으로 하기 위함
    secret: secret,
    cookie: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#define_where_cookies_are_sent
      domain: 'localhost',
      path: '/',
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies
      secure: true,
      httpOnly: true,
    },
  });

  app.register(fastifyStatic, {
    root: join(__dirname, '..', '.well-known'),
  });

  const { port } = configService.get<EnvironmentConfig>('environment');

  await app.listen(port, '0.0.0.0');
  // fastify는 기본적으로 localhost 127.0.0.1 interface에서만 수신이 가능하다.
  // 다른 IPv4 interface에서도 수신할 수 있게 하기 위해 '0.0.0.0'을 listen메서드의 두 번째 인자로 전달해주는 것
}
bootstrap();
