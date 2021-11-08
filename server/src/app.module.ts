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
} from './modules';
import { ExecutiveModule } from './modules/executive.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
