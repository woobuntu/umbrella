import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';
import {
  MetaModule,
  MetaFileRelationModule,
  ContactModule,
  AccountModule,
  HistoryModule,
  ExecutiveFileRelationModule,
  GnbModule,
  AuthModule,
  ProductModule,
  BasketModule,
  DayjsModule,
  PrismaModule,
  UserModule,
  PaymentModule,
  PerformanceModule,
  NotificationModule,
} from './modules';
import { ExecutiveModule } from './modules/executive.module';
import {
  environmentConfig,
  kakaoConfig,
  naverConfig,
  tossConfig,
  sendgridConfig,
  awsConfig,
} from './config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { HealthController } from './controllers';
import { Upload } from './graphql/types/file';

@Module({
  controllers: [HealthController],
  imports: [
    // https://docs.nestjs.com/techniques/configuration#use-module-globally
    ConfigModule.forRoot({
      isGlobal: true,
      // https://docs.nestjs.com/techniques/configuration#configuration-namespaces
      load: [
        environmentConfig,
        naverConfig,
        kakaoConfig,
        tossConfig,
        sendgridConfig,
        awsConfig,
      ],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'webroot'),
      // certbot에 입력할 webroot디렉토리
    }),
    MetaModule,
    MetaFileRelationModule,
    ContactModule,
    AccountModule,
    HistoryModule,
    ExecutiveModule,
    ExecutiveFileRelationModule,
    GnbModule,
    AuthModule,
    ProductModule,
    BasketModule,
    DayjsModule,
    PrismaModule,
    UserModule,
    PaymentModule,
    PerformanceModule,
    NotificationModule,
    GraphQLModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        // code first approach를 통해 schema 파일 생성
        autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
        // 스키마를 사전편찬순으로 정렬
        sortSchema: true,
        // graphql-playground 대신 apollo sandbox를 graphql ide로 사용
        // 배포된 graphql server의 documentation을 apollo sandbox가 인지하지 못하는데,
        // 쿼리는 정상적으로 동작하니 당황하지 말자
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault],
        // https://docs.nestjs.com/security/cors#getting-started
        cors: {
          // origin: configService.get<string>('environment.clientUrl'),
          origin: true,
          credentials: true,
        },
        // https://stackoverflow.com/questions/63195571/unable-to-set-cookie-in-nestjs-graphql
        context: ({ request, reply }) => ({ request, reply }),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [Upload],
})
export class AppModule {}
