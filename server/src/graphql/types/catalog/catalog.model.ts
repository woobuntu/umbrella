import { ObjectType } from '@nestjs/graphql';
import { CatalogFileRelation } from '../catalog-file-relation';

@ObjectType()
export class Catalog {
  id: number;

  name: string;

  price: number;

  catalogFileRelations: CatalogFileRelation[];
}
