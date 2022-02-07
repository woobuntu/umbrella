import { ObjectType } from '@nestjs/graphql';
import { File } from '../file';

@ObjectType()
export class ExecutiveFileRelation {
  id: number;

  executiveId: number;

  fileId: number;

  file: File;
}
