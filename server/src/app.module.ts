import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
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
  UserModule,
} from './modules';
import { ExecutiveModule } from './modules/executive.module';

@Module({
  imports: [
    MetaModule,
    MetaFileRelationModule,
    ContactModule,
    AccountModule,
    HistoryModule,
    ExecutiveModule,
    ExecutiveFileRelationModule,
    GnbModule,
    UserModule,
    GraphQLModule.forRoot({
      // code first approach를 통해 schema 파일 생성
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
      // 스키마를 사전편찬순으로 정렬
      sortSchema: true,
      // graphql-playground 대신 apollo sandbox를 graphql ide로 사용
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),
  ],
})
export class AppModule {}
