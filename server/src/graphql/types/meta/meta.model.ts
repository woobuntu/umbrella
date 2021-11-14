import { ObjectType } from '@nestjs/graphql';
import { MetaFileRelation } from '../meta-file-relation';

@ObjectType()
export class Meta {
  name: string;

  type: string;

  metaFileRelations: MetaFileRelation[];
}
