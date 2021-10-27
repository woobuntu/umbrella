import { ObjectType } from '@nestjs/graphql';
import { File } from '../file';

@ObjectType()
export class MetaFileRelation {
  fileId: number;

  file: File;
}
