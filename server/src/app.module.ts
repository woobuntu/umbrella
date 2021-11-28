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
  CatalogModule,
  BasketModule,
  StaticModule,
  PurchaseModule,
} from './modules';
import { ExecutiveModule } from './modules/executive.module';
import {
  environmentConfig,
  kakaoConfig,
  naverConfig,
  tossConfig,
} from './config';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration#use-module-globally
    ConfigModule.forRoot({
      isGlobal: true,
      // https://docs.nestjs.com/techniques/configuration#configuration-namespaces
      load: [environmentConfig, naverConfig, kakaoConfig, tossConfig],
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
    CatalogModule,
    BasketModule,
    StaticModule,
    PurchaseModule,
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
})
export class AppModule {}
