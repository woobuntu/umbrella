import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Meta {
  id: number;

  name: string;

  type: string;
}
