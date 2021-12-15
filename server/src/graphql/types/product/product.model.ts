import { ObjectType } from '@nestjs/graphql';
import { ProductFileRelation } from '../product-file-relation';
import { ProductOptionRelation } from '../product-option-relation';

@ObjectType()
export class Product {
  id: number;

  name: string;

  price: number;

  expirationDate?: string;

  storageMethod?: string;

  ingredients?: string;

  productFileRelations: ProductFileRelation[];

  productOptionRelations: ProductOptionRelation[];
}
