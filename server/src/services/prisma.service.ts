// https://docs.nestjs.com/recipes/prisma#use-prisma-client-in-your-nestjs-services
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma, PrismaClient } from '@prisma/client';
import { EnvironmentConfig } from 'src/types/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(private configService: ConfigService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();

    const { nodeEnv } =
      this.configService.get<EnvironmentConfig>('environment');
    // https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging#event-based-logging
    // PrismaClient에 LogLevel type이 정의되어 있음에도 'beforeExit'만 허용
    // 추후 prisma측에서 수정할 것으로 예상
    // if (nodeEnv === 'development')
    //   this.$on<any>('query', (event: Prisma.QueryEvent) => {
    //     console.log(`Query: ${event.query}`);
    //     console.log(`Params: ${event.params}`);
    //     console.log(`Duration: ${event.duration}ms\n`);
    //   });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
