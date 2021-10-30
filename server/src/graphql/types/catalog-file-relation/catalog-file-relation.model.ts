import { ObjectType } from '@nestjs/graphql';
import { File } from '../file';

@ObjectType()
export class CatalogFileRelation {
  id: number;

  catalogId: number;

  fileId: number;

  file: File;
}
