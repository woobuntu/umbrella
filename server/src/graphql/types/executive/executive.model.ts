import { ObjectType } from '@nestjs/graphql';
import { Career } from '../career';
import { ExecutiveFileRelation } from '../executive-file-relation';

@ObjectType()
export class Executive {
  id: number;

  name: string;

  position: string;

  greeting?: string;

  careers: Career[];

  executiveFileRelations: ExecutiveFileRelation[];
}
