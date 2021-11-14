import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Lnb {
  id: number;

  name: string;

  path: string;

  gnbId: number;
}
