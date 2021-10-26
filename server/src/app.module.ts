import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot({
      // code first approach를 통해 schema 파일 생성
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // 스키마를 사전편찬순으로 정렬
      sortSchema: true,
      // apollo-server-fastify는 복수의 graphql 엔드포인트를 허용하기 위해서
      // healthCheck를 해제해주어야 한다.
      // https://docs.nestjs.com/graphql/quick-start#multiple-endpoints
      disableHealthCheck: true,
      // graphql-playground 대신 apollo sandbox를 graphql ide로 사용
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
