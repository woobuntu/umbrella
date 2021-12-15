import { ObjectType } from '@nestjs/graphql';
import { File } from '../file';

@ObjectType()
export class ProductFileRelation {
  id: number;

  productId: number;

  fileId: number;

  file: File;
}
