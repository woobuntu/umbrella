// https://docs.nestjs.com/techniques/performance#performance-fastify
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  await app.listen(5000, '0.0.0.0');
  // fastify는 기본적으로 localhost 127.0.0.1 interface에서만 수신이 가능하다.
  // 다른 IPv4 interface에서도 수신할 수 있게 하기 위해 '0.0.0.0'을 listen메서드의 두 번째 인자로 전달해주는 것
}
bootstrap();
