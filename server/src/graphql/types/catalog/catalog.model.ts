import { ObjectType } from '@nestjs/graphql';
import { CatalogFileRelation } from '../catalog-file-relation';
import { CatalogOptionRelation } from '../catalog-option-relation';

@ObjectType()
export class Catalog {
  id: number;

  name: string;

  price: number;

  catalogFileRelations: CatalogFileRelation[];

  catalogOptionRelations: CatalogOptionRelation[];
}
