import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class History {
  date: string;

  event: string;
}
