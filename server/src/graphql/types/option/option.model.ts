import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Option {
  id: number;

  name: string;
}
