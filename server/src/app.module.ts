import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
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
} from './modules';
import { ExecutiveModule } from './modules/executive.module';
import {
  environmentConfig,
  kakaoConfig,
  naverConfig,
  sessionConfig,
} from './config';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/configuration#use-module-globally
    ConfigModule.forRoot({
      isGlobal: true,
      // https://docs.nestjs.com/techniques/configuration#configuration-namespaces
      load: [environmentConfig, naverConfig, sessionConfig, kakaoConfig],
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
    GraphQLModule.forRoot({
      // code first approach를 통해 schema 파일 생성
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      // 스키마를 사전편찬순으로 정렬
      sortSchema: true,
      // graphql-playground 대신 apollo sandbox를 graphql ide로 사용
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
      // https://docs.nestjs.com/security/cors#getting-started
      cors: {
        // origin: 'http://localhost:3000',
        origin: true,
        credentials: true,
      },
      // https://stackoverflow.com/questions/63195571/unable-to-set-cookie-in-nestjs-graphql
      context: ({ request, reply }) => ({ request, reply }),
    }),
  ],
})
export class AppModule {}
