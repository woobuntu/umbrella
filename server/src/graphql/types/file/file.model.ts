import { ObjectType } from '@nestjs/graphql';
import { MetaFileRelation } from '../meta-file-relation';

@ObjectType()
export class File {
  id: number;

  name: string;

  path: string;

  type: string;
}
