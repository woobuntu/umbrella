import { ObjectType } from '@nestjs/graphql';
import { Lnb } from '../lnb';

@ObjectType()
export class Gnb {
  id: number;

  name: string;

  lnbs: Lnb[];
}
