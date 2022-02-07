import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class File {
  id: number;

  name: string;

  path: string;

  type: string;
}
